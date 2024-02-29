import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";
import { useRef, useState } from "react";

const Todo_writable = ({ curTodo }) => {
  console.log(curTodo);

  const todoItemId = useRef(10);
  const [isMenu, setIsMenu] = useState(false);

  const handleIsMenu = (e) => {
    e.stopPropagation();
    if (e.target.className === "menu_mark") {
      console.log("menu_mark clicked");
      setIsMenu(!isMenu);
    } else {
      setIsMenu(false);
    }
  };

  return (
    <div className="view Todo_writable" onClick={handleIsMenu}>
      <section className="add_TodoItem_area">
        <div className="add_TodoItem_input">
          <input type="text" placeholder="할 일을 입력해 주세요" />
        </div>
        <Button type="create" text="create" onClick={() => {}} />
      </section>
      <section className="Todoes_display_area">
        <Category
          type="ToDo"
          items={curTodo.not_started}
          isMenu={isMenu}
          handleIsMenu={handleIsMenu}
        />
        <Category
          type="IN PROGRESS"
          items={curTodo.in_progress}
          isMenu={isMenu}
          handleIsMenu={handleIsMenu}
        />
        <Category
          type="CLOSED"
          items={curTodo.done}
          isMenu={isMenu}
          handleIsMenu={handleIsMenu}
        />
      </section>
      <section></section>
    </div>
  );
};

Todo_writable.propTypes = {
  curTodo: PropTypes.object.isRequired,
};

export default Todo_writable;
