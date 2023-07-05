// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Admin403 from "./Admin403";

// import CurrentUserContext from "../contexts/CurrentUser";

// export default function AuthorsList() {
//   const { currentUser } = useContext(CurrentUserContext);

//   //   usestate, useeffect, définir auteurs etc
//   function getAuthors(e) {
//     e.preventDefault();
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/authors`, {
//         firstname,
//         lastname,
//         artistname,
//         birthdate,
//         deathdate,
//         birthplace,
//         deathplace,
//         biography,
//       })
//       .then((res) => res.data)
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   return (
//     // eslint-disable-next-line react/jsx-no-useless-fragment
//     <>
//       {currentUser.isAdmin ? (
//         <section className="account authors">
//           <h2>Gérer les auteurs</h2>
//           <p>
//             <Link to="/account/authors/add">Ajouter un auteur</Link>
//           </p>
//           {authors.length && (
//             <ul>
//               {authors.map((author) => {
//                 const { id, firstname, lastname } = author;
//                 return (
//                   <li key={`authors-${id}`}>
//                     <Link to={`/account/authors/${id}`}>
//                       {(firstname, lastname)}
//                     </Link>
//                     <Link
//                       to={`/account/authors/delete/${id}`}
//                       className="delete"
//                     >
//                       Supprimer
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </section>
//       ) : (
//         <Admin403 />
//       )}
//     </>
//   );
// }
