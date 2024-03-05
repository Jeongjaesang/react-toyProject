import React, { useEffect, useReducer } from "react";
import TodoRoot from "./components/TodoRoot";
import {
  copyTodo_daily,
  copyState,
  createTodoDaily,
  getToDayTodoDaily,
} from "./services/services.js";
import "./App.css";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE_TODO_DAILY": {
      const newData = copyTodo_daily(action.data);
      newState = [...state, newData];
      break;
    }

    case "DELETE_TODO_DAILY": {
      newState = state.filter((todo_daily) => todo_daily.id !== action.id);
      break;
    }
    // 3월 2일에 todo_daily에 todo추가 추가한 todo를 오늘 하기로 옮김
    // 3월 2일 todo_daily에 새로운 todo추가 -> 에러

    case "UPDATE_TODO_DAILY": {
      console.log("update action occured");
      newState = state.map((todo_daily) => {
        if (todo_daily.id === action.data.id) {
          const newTodo_daily = copyTodo_daily(action.data);
          return newTodo_daily;
        } else {
          return todo_daily;
        }
      });
      console.log(newState);
      break;
    }

    case "MOVE_TODOITEM_TO_TODAY_TODO_DAILY": {
      newState = copyState(state);
      const targetTodoDaily = newState.find(
        (todo_daily) => todo_daily.id === action.data.todoDaily.id
      ); // todo_daily를 찾음
      const targetTodoItemIndex = targetTodoDaily[
        action.data.category
      ].findIndex((todoItem) => todoItem.id === Number(action.data.todoItemId));

      const targetTodoItem = targetTodoDaily[action.data.category].splice(
        targetTodoItemIndex,
        1
      )[0]; // 삭제 => 삭제하려는 item을 포함한 Todo_daily, category, todoItemId를 전달 받아 해당 아이템을 삭제한다.
      // splice 메서드의 반환값은 배열임을 주의!!

      let todayTodoDaily = getToDayTodoDaily(newState);

      if (!todayTodoDaily) {
        // 오늘의 todoDaily가 없다면 만든다.
        const todayString = new Date().toDateString();
        todayTodoDaily = createTodoDaily(todayString);
        newState.push(todayTodoDaily);
      }
      todayTodoDaily[action.data.category].push(targetTodoItem);
      break;
    }

    default:
      return state;
  }
  localStorage.setItem("state", JSON.stringify(newState));
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("state"));

    if (localData) {
      dispatch({ type: "INIT", data: localData });
    }
  }, []);

  const onCreateTodoDaily = (data) => {
    dispatch({ type: "CREATE_TODO_DAILY", data: data });
  };

  const onDeleteTodoDaily = (todoDailyId) => {
    dispatch({ type: "DELETE_TODO_DAILY", id: todoDailyId });
  };

  const onUpdateTodoDaily = (data) => {
    dispatch({ type: "UPDATE_TODO_DAILY", data: data });
  };

  const onMoveToDoItemToTodayTodoDaily = (todoDaily, category, todoItemId) => {
    dispatch({
      type: "MOVE_TODOITEM_TO_TODAY_TODO_DAILY",
      data: {
        todoDaily: todoDaily,
        category: category,
        todoItemId: todoItemId,
      },
    });
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider
        value={{
          onCreateTodoDaily,
          onDeleteTodoDaily,
          onUpdateTodoDaily,
          onMoveToDoItemToTodayTodoDaily,
        }}
      >
        <TodoRoot />
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
export default App;
