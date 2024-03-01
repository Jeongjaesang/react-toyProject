import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";
import { useContext, useRef, useState } from "react";
import { TodoDispatchContext } from "../App";
import { copyTodo_daily } from "../services/services";

const Todo_writable = ({ curTodo_daily }) => {
  // console.log(curTodo_daily);

  const [inputValue, setInputValue] = useState("");

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const todoItemId = useRef(10); // Todo_item의 아이디가 모두 달라야함
  // 어제의 Todo_item을 오늘의 Todo_Item으로 옮길 수도 있는 것을 고려하면..

  const { onDeleteTodoDaily, onUpdateTodoDaily } =
    useContext(TodoDispatchContext);

  const handleDeleteTodoDaily = () => {
    if (window.confirm("오늘의 Todo 목록을 삭제하시겠습니까?")) {
      onDeleteTodoDaily(Number(curTodo_daily.id));
    }
  };

  const handleCreateTodoItem = () => {
    const newTodo_daily = copyTodo_daily(curTodo_daily);
    newTodo_daily.not_started.push({
      id: todoItemId.current,
      title: inputValue,
    });
    todoItemId.current += 1;
    onUpdateTodoDaily(newTodo_daily);
    setInputValue("");
  };

  return (
    <div className="view Todo_writable">
      <section className="add_TodoItem_area">
        <div className="add_TodoItem_input">
          <input
            type="text"
            placeholder="할 일을 입력해 주세요"
            value={inputValue}
            onChange={onChangeInputValue}
          />
        </div>
        <Button type="create" text="create" onClick={handleCreateTodoItem} />
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
