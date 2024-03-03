import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { TodoStateContext } from "../App";
import Todo_writable from "./Todo_writable";
import Empty from "./Empty";

const TodoRoot = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [curTodo_daily, setcurTodo_daily] = useState(null);

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

  const goToTodayTodoDaily = () => {
    setCurDate(new Date());
  };

  useEffect(() => {
    // state에서 현재 날짜에 해당하는 Todo가 있으면 가져온다.
    const targetTodoDaily = state.find(
      (todoDaily) => todoDaily.id === curDate.toDateString()
    );
    setcurTodo_daily(targetTodoDaily);
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
      {new Date().toDateString() !== curDate.toDateString() && (
        <div className="homeBtnWrapper">
          <Button
            type="default"
            text="오늘 Todo로 가기"
            onClick={goToTodayTodoDaily}
          />
        </div>
      )}
    </div>
  );
};

export default TodoRoot;
