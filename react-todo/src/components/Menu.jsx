import { forwardRef, useContext } from "react";
import { Todo_DailyDispatchContext } from "./Todo_writable";
import PropTypes from "prop-types";

const menuList = [
  { id: 1, title: "오늘 하기", type: null },
  { id: 2, title: "삭제하기", type: null },
  { id: 3, title: "Todo로 옮기기", type: "not_started" },
  { id: 4, title: "in progress로 옮기기", type: "in_progress" },
  { id: 5, title: "closed로 옮기기", type: "done" },
];

const Menu = forwardRef(function MyInput({ type, id }, ref) {
  const { handleDeleteTodoItem, handleMovoTodoItemToToday } = useContext(
    Todo_DailyDispatchContext
  );

  const onClickDelete = () => {
    handleDeleteTodoItem(type, id);
  };

  const onClickMoveTodoToToday = () => {
    handleMovoTodoItemToToday(type, id);
  };

  return (
    <ul className="Menu" ref={ref}>
      {menuList.map((menu) => {
        switch (menu.id) {
          case 1:
            return (
              <li key={menu.id} onClick={onClickMoveTodoToToday}>
                {menu.title}
              </li>
            );
          case 2:
            return (
              <li key={menu.id} onClick={onClickDelete}>
                {menu.title}
              </li>
            );
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
