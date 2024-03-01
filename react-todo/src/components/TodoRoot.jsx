import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { TodoStateContext } from "../App";
import Todo_writable from "./Todo_writable";
import Empty from "./Empty";

const TodoRoot = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [curTodo_daily, setcurTodo_daily] = useState(null);

  const state = useContext(TodoStateContext);

  // dummycurTodo_daily =   {
  //   id: 1,
  //   createdAt: "Wed Feb 28 2024",
  //   not_started: [
  //     { id: 1, title: "Learn Redux" },
  //     { id: 3, title: "Learn Next js" },
  //   ],
  //   in_progress: [{ id: 2, title: "Learn React" }],
  //   done: [],
  // },

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
    setcurTodo_daily(targetTodo);
  }, [curDate, state]);

  return (
    <div className="TodoRoot">
      <header className="Header">
        <Button type="default" text="<" onClick={decreaseDate} />
        {headText}
        <Button type="default" text=">" onClick={increaseDate} />
      </header>
      {curTodo_daily ? (
        <Todo_writable curTodo_daily={curTodo_daily} />
      ) : (
        <Empty curDate={curDate.toDateString()} />
      )}
    </div>
  );
};

export default TodoRoot;
