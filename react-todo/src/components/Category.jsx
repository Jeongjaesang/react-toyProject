import Category_header from "./Category_header";
import PropTypes from "prop-types";

const Category = ({ type, items }) => {
  return (
    <div className="Category">
      <Category_header type={type} length={items.length} />
    </div>
  );
};

Category.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Category;
