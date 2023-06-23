import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AccountBreadcrumb({ breadcrumb }) {
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

AccountBreadcrumb.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  breadcrumb: PropTypes.array.isRequired,
};
