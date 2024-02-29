import PropTypes from "prop-types";

const Category_header = ({ type, length }) => {
  return (
    <div className={["Category_header", `Category_header_${type}`].join(" ")}>
      <span>{type}</span>
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
