import PropTypes from "prop-types";

const typeCategoryMatching = {
  not_started: "ToDo",
  in_progress: "IN PROGRESS",
  done: "CLOSED",
};

const Category_header = ({ type, length }) => {
  return (
    <div
      className={[
        "Category_header",
        `Category_header_${typeCategoryMatching[type]}`,
      ].join(" ")}
    >
      <span>{typeCategoryMatching[type]}</span>
      <div>
        <span>{length}</span>
      </div>
    </div>
  );
};

Category_header.propTypes = {
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};

export default Category_header;
