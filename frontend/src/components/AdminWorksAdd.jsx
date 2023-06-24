import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksAdd() {
  const { currentUser } = useContext(CurrentUserContext);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  // const [title, setTitle] = useState("");
  // const [shortTitle, setShortTitle] = useState("");
  // const [reference, setReference] = useState("");
  // const [image, setImage] = useState("");
  // const [description, setDescription] = useState("");
  // const [authorId, setAuthorId] = useState("0");
  // const [categoryId, setCategoryId] = useState("0");
  // const [techniqueId, setTechniqueId] = useState("0");
  // const [created, setCreated] = useState("");
  // const [location, setLocation] = useState("");
  // const [sizes, setSizes] = useState("");
  // const [story, setStory] = useState("");
  // const [external, setExternal] = useState("");
  // const [isPublished, setIsPublished] = useState("0");
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
      title: "Ajouter une œuvre",
      link: null,
    },
  ];

  useEffect(() => {
    const host = import.meta.env.VITE_BACKEND_URL;
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

  // const handleTitle = (e) => {
  //   setTitle(e.target.value);
  // };
  // const handleShortTitle = (e) => {
  //   setShortTitle(e.target.value);
  // };
  // const handleReference = (e) => {
  //   setReference(e.target.value);
  // };
  // const handleImage = (e) => {
  //   setImage(e.target.value);
  // };
  // const handleDescription = (e) => {
  //   setDescription(e.target.value);
  // };
  // const handleAuthorId = (e) => {
  //   setAuthorId(e.target.value);
  // };
  // const handleCategoryId = (e) => {
  //   setCategoryId(e.target.value);
  // };
  // const handleTechniqueId = (e) => {
  //   setTechniqueId(e.target.value);
  // };
  // const handleCreated = (e) => {
  //   setCreated(e.target.value);
  // };
  // const handleLocation = (e) => {
  //   setLocation(e.target.value);
  // };
  // const handleSizes = (e) => {
  //   setSizes(e.target.value);
  // };
  // const handleStory = (e) => {
  //   setStory(e.target.value);
  // };
  // const handleExternal = (e) => {
  //   setExternal(e.target.value);
  // };
  // const handleIsPublished = (e) => {
  //   setIsPublished(e.target.value);
  // };
  const handleAdd = (e) => {
    e.preventDefault();
    const validationFilters = {
      title: {
        type: "string",
      },
      reference: {
        type: "string",
      },
      image: {
        type: "upload",
        formats: ["image/jpeg", "image/png", "image/svg+xml", "image/tiff"],
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
    // const fields = {
    //   title,
    //   shortTitle,
    //   reference,
    //   image,
    //   description,
    //   authorId,
    //   categoryId,
    //   techniqueId,
    //   created,
    //   location,
    //   sizes,
    //   story,
    //   external,
    //   isPublished,
    // };
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
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account works">
            <h2>Ajouter une œuvre</h2>
            <p>Les champs accompagnés d’un * sont obligatoires</p>
            <form encType="multipart/form-data" onSubmit={handleAdd} noValidate>
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
                  <input id="add-title" name="title" type="text" required />
                </p>
                <p>
                  <label htmlFor="add-short-title">Titre abrégé</label>
                  <input id="add-short-title" name="shortTitle" type="text" />
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
                    required
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Image</legend>
                <p>
                  <label htmlFor="add-image">
                    Fichier à téléverser
                    <span aria-label=" obligatoire"> *</span>
                    {invalidFields.includes("image") && (
                      <span className="error">
                        (un fichier au format JPG, PNG, SVG ou TIFF doit être
                        sélectionné)
                      </span>
                    )}
                  </label>
                  <input
                    id="add-image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/svg+xml,image/tiff"
                    required
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
                    <select id="add-author" name="authorId" required>
                      {authors.map((option) => {
                        const { id, firstname, lastname, artistname } = option;
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
                    <select id="add-category" name="categoryId" required>
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
                    <select id="add-technique" name="techniqueId" required>
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
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Compléments</legend>
                <p>
                  <label htmlFor="add-story">Anecdote</label>
                  <textarea id="add-story" name="story" />
                </p>
                <p>
                  <label htmlFor="add-external">Lien externe</label>
                  <input
                    id="add-external"
                    name="external"
                    type="url"
                    maxLength="255"
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Publier l’œuvre&nbsp;?</legend>
                <ul>
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
                </ul>
              </fieldset>
              <p>
                <input type="submit" value="Ajouter" />
              </p>
            </form>
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
