import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoDispatchContext } from "../App";
import { copyTodo_daily } from "../services/services";

export const Todo_DailyContext = React.createContext();
export const Todo_DailyDispatchContext = React.createContext();

const Todo_writable = ({ curTodo_daily }) => {
  console.log(curTodo_daily);

  const [inputValue, setInputValue] = useState("");

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const todoItemId = useRef(10); // Todo_item의 아이디가 모두 달라야함
  // 어제의 Todo_item을 오늘의 Todo_Item으로 옮길 수도 있는 것을 고려하면..

  const inputRef = useRef(null);

  const { onDeleteTodoDaily, onUpdateTodoDaily } =
    useContext(TodoDispatchContext);

  const handleDeleteTodoDaily = () => {
    if (window.confirm("오늘의 Todo 목록을 삭제하시겠습니까?")) {
      onDeleteTodoDaily(Number(curTodo_daily.id));
    }
  };

  const handleCreateTodoItem = () => {
    if (!inputValue) {
      alert("할 일을 입력하셔야 추가됩니다.");
      inputRef.current.focus();
      return;
    }

    const newTodo_daily = copyTodo_daily(curTodo_daily);
    newTodo_daily.not_started.push({
      id: todoItemId.current,
      title: inputValue,
    });
    todoItemId.current += 1;
    onUpdateTodoDaily(newTodo_daily);
    setInputValue("");
  };

  // context api를 사용해야 할 듯!
  const handleDeleteTodoItem = (category, todoItemId) => {
    const newTodo_daily = copyTodo_daily(curTodo_daily);
    newTodo_daily[category] = newTodo_daily[category].filter(
      (todo_item) => todo_item.id !== Number(todoItemId)
    );
    onUpdateTodoDaily(newTodo_daily);
  };

  const handleMoveTodoItem = (fromCategory, toCategory, todoItemId) => {};

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key == "Enter") {
        handleCreateTodoItem();
        alert("enter pressed");
      }
    };

    // 입력하고 엔터 누를 때 추가되게 하기
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [inputValue]); // 노란줄, 뭐가 문제일까? 일단 보류..

  return (
    <div className="view Todo_writable">
      <section className="add_TodoItem_area">
        <div className="add_TodoItem_input">
          <input
            type="text"
            placeholder="할 일을 입력해 주세요"
            value={inputValue}
            onChange={onChangeInputValue}
            ref={inputRef}
          />
        </div>
        <Button type="create" text="create" onClick={handleCreateTodoItem} />
      </section>
      <Todo_DailyDispatchContext.Provider value={{ handleDeleteTodoItem }}>
        <section className="Todoes_display_area">
          <Category type="not_started" items={curTodo_daily.not_started} />
          <Category type="in_progress" items={curTodo_daily.in_progress} />
          <Category type="done" items={curTodo_daily.done} />
        </section>
        <section className="footer">
          <Button
            type="delete"
            text="삭제하기"
            onClick={handleDeleteTodoDaily}
          />
        </section>
      </Todo_DailyDispatchContext.Provider>
    </div>
  );
};

Todo_writable.propTypes = {
  curTodo_daily: PropTypes.object.isRequired,
};

export default Todo_writable;
