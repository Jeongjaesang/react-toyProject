import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";

const Todo_writable = ({ curTodo }) => {
  console.log(curTodo);

  return (
    <div className="view Todo_writable">
      <section className="add_TodoItem_area">
        <div className="add_TodoItem_input">
          <input type="text" placeholder="할 일을 입력해 주세요" />
        </div>
        <Button type="create" text="create" onClick={() => {}} />
      </section>
      <section className="Todoes_display_area">
        <Category type="ToDo" items={curTodo.not_started} />
        <Category type="IN PROGRESS" items={curTodo.in_progress} />
        <Category type="CLOSED" items={curTodo.done} />
      </section>
      <section></section>
    </div>
  );
};

Todo_writable.propTypes = {
  curTodo: PropTypes.object.isRequired,
};

export default Todo_writable;
