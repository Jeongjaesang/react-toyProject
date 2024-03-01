import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";
import { useContext, useRef } from "react";
import { TodoDispatchContext } from "../App";

const Todo_writable = ({ curTodo_daily }) => {
  console.log(curTodo_daily);

  const todoItemId = useRef(10);

  const { onDeleteTodoDaily } = useContext(TodoDispatchContext);

  const handleDeleteTodoDaily = () => {
    if (window.confirm("오늘의 Todo 목록을 삭제하시겠습니까?")) {
      onDeleteTodoDaily(Number(curTodo_daily.id));
    }
  };

  return (
    <div className="view Todo_writable">
      <section className="add_TodoItem_area">
        <div className="add_TodoItem_input">
          <input type="text" placeholder="할 일을 입력해 주세요" />
        </div>
        <Button type="create" text="create" onClick={() => {}} />
      </section>
      <section className="Todoes_display_area">
        <Category type="ToDo" items={curTodo_daily.not_started} />
        <Category type="IN PROGRESS" items={curTodo_daily.in_progress} />
        <Category type="CLOSED" items={curTodo_daily.done} />
      </section>
      <section className="footer">
        <Button type="delete" text="삭제하기" onClick={handleDeleteTodoDaily} />
      </section>
    </div>
  );
};

Todo_writable.propTypes = {
  curTodo_daily: PropTypes.object.isRequired,
};

export default Todo_writable;
