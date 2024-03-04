import Button from "./Button";
import PropTypes from "prop-types";
import Category from "./Category";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TodoDispatchContext } from "../App";
import { copyTodo_daily } from "../services/services";
import { v4 as uuidv4 } from "uuid";

export const Todo_DailyContext = React.createContext();
export const Todo_DailyDispatchContext = React.createContext();

const Todo_writable = ({ curTodo_daily }) => {
  // console.log(curTodo_daily);

  const [inputValue, setInputValue] = useState("");

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const inputRef = useRef(null);

  const {
    onDeleteTodoDaily,
    onUpdateTodoDaily,
    onMoveToDoItemToTodayTodoDaily,
  } = useContext(TodoDispatchContext);

  const checkToday = () => {
    const todayString = new Date().toDateString();
    return curTodo_daily.id == todayString;
  };

  const handleDeleteTodoDaily = () => {
    if (window.confirm("오늘의 Todo 목록을 삭제하시겠습니까?")) {
      onDeleteTodoDaily(curTodo_daily.id);
    }
  };

  const handleCreateTodoItem = useCallback(() => {
    if (!inputValue) {
      alert("할 일을 입력하셔야 추가됩니다.");
      inputRef.current.focus();
      return;
    }

    const newTodo_daily = copyTodo_daily(curTodo_daily);
    newTodo_daily.not_started.push({
      id: uuidv4(), // 랜덤 아이디 생성 라이브러리
      title: inputValue,
    });
    onUpdateTodoDaily(newTodo_daily);
    setInputValue("");
  }, [curTodo_daily, onUpdateTodoDaily, inputValue]);

  // context api를 사용해야 할 듯!
  const handleDeleteTodoItem = (category, todoItemId) => {
    const newTodo_daily = copyTodo_daily(curTodo_daily);
    newTodo_daily[category] = newTodo_daily[category].filter(
      (todo_item) => todo_item.id !== todoItemId
    );
    onUpdateTodoDaily(newTodo_daily);
  };

  const handleMoveTodoItem = (fromCategory, toCategory, todoItemId) => {
    const newTodo_daily = copyTodo_daily(curTodo_daily);
    const targetTodoItemIndex = newTodo_daily[fromCategory].findIndex(
      (todoItem) => todoItem.id === todoItemId
    );
    const targetTodoItem = newTodo_daily[fromCategory].splice(
      targetTodoItemIndex,
      1
    )[0];
    newTodo_daily[toCategory].push(targetTodoItem);
    onUpdateTodoDaily(newTodo_daily);
  };

  const handleMovoTodoItemToToday = (category, todoItemId) => {
    onMoveToDoItemToTodayTodoDaily(curTodo_daily, category, todoItemId);
  };

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
      <Todo_DailyDispatchContext.Provider
        value={{
          handleDeleteTodoItem,
          handleMoveTodoItem,
          handleMovoTodoItemToToday,
          checkToday,
        }}
      >
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
