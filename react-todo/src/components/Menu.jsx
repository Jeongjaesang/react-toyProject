import { forwardRef, useContext } from "react";
import { Todo_DailyDispatchContext } from "./Todo_writable";
import PropTypes from "prop-types";

const menuList = [
  { id: 1, title: "오늘 하기", type: null },
  { id: 2, title: "삭제하기", type: null },
  { id: 3, title: "Todo로", type: "not_started" },
  { id: 4, title: "in progress로", type: "in_progress" },
  { id: 5, title: "closed로", type: "done" },
];

const Menu = forwardRef(function MyInput({ type, id }, ref) {
  const {
    handleDeleteTodoItem,
    handleMoveTodoItem,
    handleMovoTodoItemToToday,
    checkToday,
  } = useContext(Todo_DailyDispatchContext);

  const onClickDelete = () => {
    handleDeleteTodoItem(type, id);
  };
  const onClickMoveTodoItem = (e) => {
    handleMoveTodoItem(type, e.target.dataset.type, id);
  };

  const onClickMoveTodoToToday = () => {
    handleMovoTodoItemToToday(type, id);
  };

  return (
    <ul className="Menu" ref={ref}>
      {menuList.map((menu) => {
        switch (menu.id) {
          case 1:
            if (!checkToday()) {
              return (
                <li key={menu.id} onClick={onClickMoveTodoToToday}>
                  {menu.title}
                </li>
              );
            }
            break;
          case 2:
            return (
              <li key={menu.id} onClick={onClickDelete}>
                {menu.title}
              </li>
            );
          case 3:
          case 4:
          case 5:
            if (menu.type != type) {
              return (
                <li
                  key={menu.id}
                  onClick={onClickMoveTodoItem}
                  data-type={menu.type}
                >
                  {menu.title}
                </li>
              );
            }
            break;
          default:
            break;
        }
      })}
    </ul>
  );
});

Menu.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Menu;
