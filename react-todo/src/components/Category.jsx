import Category_header from "./Category_header";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const Category = ({ type, items }) => {
  return (
    <div className="Category">
      <Category_header type={type} length={items.length} />
      <div className="Todo_Items">
        {items.map((item) => {
          return <TodoItem key={item.id} title={item.title} />;
        })}
      </div>
    </div>
  );
};

Category.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Category;
