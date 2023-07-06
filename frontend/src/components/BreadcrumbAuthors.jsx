/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Link } from "react-router-dom";

export default function BreadcrumbAuthors({ breadcrumb }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {breadcrumb.length && (
        <nav className="account-breadcrumb">
          <ul>
            {breadcrumb.map((item) => {
              const { id, link, title } = item;
              return (
                <li key={`account-breadcrumb-item-${id}`}>
                  {link ? <Link to={link}>{title}</Link> : title}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
