/* eslint-disable no-shadow */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksUpdate() {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [currentWork, setCurrentWork] = useState(new FormData());
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidWorkUpdate, setInvalidWorkUpdate] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const inputRef = useRef();
  const host = import.meta.env.VITE_BACKEND_URL;
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les œuvres",
      link: "/account/works",
    },
    {
      id: 3,
      title: currentWork.has("title")
        ? currentWork.get("title")
        : "Modifier une œuvre",
      link: null,
    },
  ];

  useEffect(() => {
    axios
      .get(`${host}/works/${id}`)
      .then((response) => {
        const { data } = response;
        const fields = new FormData();
        for (const key in data) {
          if (data[key] !== null) {
            const camelCasedKey = key
              .split("_")
              .map((e, i) => (i === 0 ? e : e[0].toUpperCase() + e.slice(1)))
              .join("");
            fields.append(camelCasedKey, data[key]);
          }
        }
        setCurrentWork(fields);
      })
      .catch((err) => console.error(err));
  }, [isUpdated]);

  useEffect(() => {
    axios
      .get(`${host}/authors`)
      .then((response) => setAuthors(response.data))
      .catch((err) => console.error(err));
    axios
      .get(`${host}/categories`)
      .then((response) => setCategories(response.data))
      .catch((err) => console.error(err));
    axios
      .get(`${host}/techniques`)
      .then((response) => setTechniques(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationFilters = {
      title: {
        type: "string",
      },
      reference: {
        type: "string",
      },
      description: {
        type: "string",
      },
      authorId: {
        type: "int",
      },
      categoryId: {
        type: "int",
      },
      techniqueId: {
        type: "int",
      },
      created: {
        type: "string",
      },
      location: {
        type: "string",
      },
    };
    const fields = new FormData(e.target);
    const errors = new Set();
    for (const [field, value] of fields.entries()) {
      if (validationFilters[field]) {
        let isInvalid = false;
        switch (validationFilters[field].type) {
          case "upload":
            if (
              !value.size ||
              !validationFilters[field].formats.includes(value.type)
            ) {
              isInvalid = true;
            }
            break;
          case "int":
            if (!value) {
              isInvalid = true;
            }
            break;
          default:
            if (!value.trim()) {
              isInvalid = true;
            }
            break;
        }
        if (isInvalid) {
          errors.add(field);
        } else {
          errors.delete(field);
        }
      }
    }
    setInvalidFields([...errors]);

    if (errors.size === 0) {
      const emptyFields = [...fields.keys()].filter(
        (key) => fields.get(key) !== null && !fields.get(key)
      );
      for (const field of emptyFields) {
        fields.delete(field);
      }
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/works/${id}`, fields)
        .then((response) => {
          if (response.status === 204) setIsUpdated(true);
        })
        .catch((err) => setInvalidWorkUpdate(err.response.data.error));
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account works">
            <h2>
              {currentWork.has("title")
                ? currentWork.get("title")
                : "Modifier une œuvre"}
            </h2>
            {isUpdated ? (
              <>
                <p>L’œuvre a été mise à jour avec succès.</p>
                <p>
                  <Link to="/account/works" className="back">
                    Retourner à la liste des œuvres
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p>
                  Les champs accompagnés d’un * sont obligatoires
                  {invalidWorkUpdate && (
                    <span className="error">{invalidWorkUpdate}</span>
                  )}
                </p>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleUpdate}
                  noValidate
                >
                  <fieldset>
                    <legend>Intitulé</legend>
                    <p>
                      <label htmlFor="add-title">
                        Titre complet
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("title") && (
                          <span className="error">
                            (un titre complet doit être saisi)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-title"
                        name="title"
                        type="text"
                        defaultValue={currentWork.get("title")}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="add-short-title">Titre abrégé</label>
                      <input
                        id="add-short-title"
                        name="shortTitle"
                        type="text"
                        defaultValue={currentWork.get("shortTitle")}
                      />
                    </p>
                    <p>
                      <label htmlFor="add-reference">
                        Référence
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("reference") && (
                          <span className="error">
                            (une référence doit être saisie)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-reference"
                        name="reference"
                        type="text"
                        maxLength="255"
                        defaultValue={currentWork.get("reference")}
                        required
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Image</legend>
                    <p>
                      <label htmlFor="add-image">Fichier à téléverser</label>
                      <input
                        id="add-image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/tiff"
                        ref={inputRef}
                      />
                    </p>
                    <p>
                      <label htmlFor="add-description">
                        Description
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("description") && (
                          <span className="error">
                            (une description doit être saisie)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-description"
                        name="description"
                        type="text"
                        maxLength="255"
                        defaultValue={currentWork.get("description")}
                        required
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Caractéristiques</legend>
                    {authors.length && (
                      <p>
                        <label htmlFor="add-author">
                          Auteur
                          <span aria-label=" obligatoire"> *</span>
                        </label>
                        <select
                          id="add-author"
                          name="authorId"
                          defaultValue={currentWork.get("authorId")}
                          required
                        >
                          {authors.map((option) => {
                            const { id, firstname, lastname, artistname } =
                              option;
                            const author = [firstname, lastname, artistname]
                              .filter((element) => element)
                              .join(" ");
                            return (
                              <option key={`author-${id}`} value={id}>
                                {author}
                              </option>
                            );
                          })}
                        </select>
                      </p>
                    )}
                    {categories.length && (
                      <p>
                        <label htmlFor="add-category">
                          Catégorie
                          <span aria-label=" obligatoire"> *</span>
                        </label>
                        <select
                          id="add-category"
                          name="categoryId"
                          defaultValue={currentWork.get("categoryId")}
                          required
                        >
                          {categories.map((option) => {
                            const { id, category } = option;
                            return (
                              <option key={`category-${id}`} value={id}>
                                {category}
                              </option>
                            );
                          })}
                        </select>
                      </p>
                    )}
                    {techniques.length && (
                      <p>
                        <label htmlFor="add-technique">
                          Technique
                          <span aria-label=" obligatoire"> *</span>
                        </label>
                        <select
                          id="add-technique"
                          name="techniqueId"
                          defaultValue={currentWork.get("techniqueId")}
                          required
                        >
                          {techniques.map((option) => {
                            const { id, technique } = option;
                            return (
                              <option key={`technique-${id}`} value={id}>
                                {technique}
                              </option>
                            );
                          })}
                        </select>
                      </p>
                    )}
                    <p>
                      <label htmlFor="add-created">
                        Date de réalisation
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("created") && (
                          <span className="error">
                            (une date de réalisation doit être saisie)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-created"
                        name="created"
                        type="text"
                        maxLength="255"
                        defaultValue={currentWork.get("created")}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="add-location">
                        Lieu de conservation
                        <span aria-label=" obligatoire"> *</span>
                        {invalidFields.includes("location") && (
                          <span className="error">
                            (un lieu de conservation doit être saisi)
                          </span>
                        )}
                      </label>
                      <input
                        id="add-location"
                        name="location"
                        type="text"
                        maxLength="255"
                        defaultValue={currentWork.get("location")}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="add-sizes">Dimensions</label>
                      <input
                        id="add-sizes"
                        name="sizes"
                        type="text"
                        maxLength="255"
                        defaultValue={currentWork.get("sizes")}
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Compléments</legend>
                    <p>
                      <label htmlFor="add-story">Anecdote</label>
                      <textarea
                        id="add-story"
                        name="story"
                        defaultValue={currentWork.get("story")}
                      />
                    </p>
                    <p>
                      <label htmlFor="add-external-link">Lien externe</label>
                      <input
                        id="add-external"
                        name="externalLink"
                        type="url"
                        maxLength="255"
                        defaultValue={currentWork.get("external")}
                      />
                    </p>
                  </fieldset>
                  <fieldset>
                    <legend>Publier l’œuvre&nbsp;?</legend>
                    <ul>
                      {currentWork.get("isPublished") === "1" ? (
                        <>
                          <li>
                            <input
                              id="add-publish-yes"
                              name="isPublished"
                              type="radio"
                              value="1"
                              defaultChecked
                            />
                            <label htmlFor="add-publish-yes">Oui</label>
                          </li>
                          <li>
                            <input
                              id="add-publish-no"
                              name="isPublished"
                              type="radio"
                              value="0"
                            />
                            <label htmlFor="add-publish-no">Non</label>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <input
                              id="add-publish-yes"
                              name="isPublished"
                              type="radio"
                              value="1"
                            />
                            <label htmlFor="add-publish-yes">Oui</label>
                          </li>
                          <li>
                            <input
                              id="add-publish-no"
                              name="isPublished"
                              type="radio"
                              value="0"
                              defaultChecked
                            />
                            <label htmlFor="add-publish-no">Non</label>
                          </li>
                        </>
                      )}
                    </ul>
                  </fieldset>
                  <p>
                    <input
                      name="imageId"
                      type="hidden"
                      defaultValue={currentWork.get("imageId")}
                    />
                    <input
                      name="prevImage"
                      type="hidden"
                      defaultValue={currentWork.get("src")}
                    />
                    <input type="submit" value="Mettre à jour" />
                  </p>
                </form>
              </>
            )}
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
