import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { TodoStateContext } from "../App";
import Todo_writable from "./Todo_writable";
import Empty from "./Empty";
const TodoRoot = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [curTodo, setCurTodo] = useState(null);

  const state = useContext(TodoStateContext);

  const headText = `${curDate.getFullYear()}년  ${
    curDate.getMonth() + 1
  }월 ${curDate.getDate()}일`;

  const increaseDate = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1)
    );
  };

  const decreaseDate = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)
    );
  };

  useEffect(() => {
    // state에서 현재 날짜에 해당하는 Todo가 있으면 가져온다.

    const targetTodo = state.find(
      (todo) => todo.createdAt === curDate.toDateString()
    );
    setCurTodo(targetTodo);
  }, [curDate, state]);

  return (
    <div className="TodoRoot">
      <header className="Header">
        <Button text="<" onClick={decreaseDate} />
        {headText}
        <Button text=">" onClick={increaseDate} />
      </header>
      {curTodo ? <Todo_writable /> : <Empty curDate={curDate.toDateString()} />}
    </div>
  );
};

export default TodoRoot;
