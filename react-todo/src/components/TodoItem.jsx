import PropTypes from "prop-types";
import Menu from "./Menu";

const TodoItem = ({ title, isMenu, handleIsMenu }) => {
  return (
    <li className="TodoItem">
      <span>{title}</span>
      <div className="menu_mark" onClick={handleIsMenu}>
        <span>...</span>
        {isMenu && <Menu />}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isMenu: PropTypes.bool.isRequired,
  handleIsMenu: PropTypes.func.isRequired,
};
export default TodoItem;
