import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { TodoStateContext } from "../App";
import Todo_writable from "./Todo_writable";
import Empty from "./Empty";

const TodoRoot = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [curTodo_daily, setcurTodo_daily] = useState(null);
  const [notCompletedTodoes, setNotCompletedTodoes] = useState(0);

  const state = useContext(TodoStateContext);

  const todoMessage = `*총 ${notCompletedTodoes}개의 미완료된 todo가 존재합니다.`;

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
    let cnt = 0;

    state.forEach((todo_daily) => {
      cnt += todo_daily.not_started.length;
      cnt += todo_daily.in_progress.length;
    });

    setNotCompletedTodoes(cnt);
  }, [state, curDate]);

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
      <h3 className="todoMessage">{todoMessage}</h3>
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
