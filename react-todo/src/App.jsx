import React, { useReducer, useState } from "react";
import TodoRoot from "./components/TodoRoot";
import { copyTodo_daily, copyState } from "./services/services.js";
import "./App.css";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "CREATE_TODO_DAILY": {
      const newData = copyTodo_daily(action.data);
      newState = [...state, newData];
      break;
    }

    case "DELETE_TODO_DAILY": {
      newState = state.filter(
        (todo_daily) => Number(todo_daily.id) !== Number(action.id)
      );
      break;
    }

    case "UPDATE_TODO_DAILY": {
      console.log("update action occured");
      newState = state.map((todo_daily) => {
        if (todo_daily.id === action.data.id) {
          const newTodo_daily = copyTodo_daily(action.data);
          return newTodo_daily;
        }
      });
      break;
    }

    default:
      return state;
  }
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const dummyData = [
  {
    id: "Wed Feb 28 2024",
    not_started: [
      { id: 1, title: "Learn Redux" },
      { id: 3, title: "Learn Next js" },
    ],
    in_progress: [{ id: 2, title: "Learn React" }],
    done: [],
  },
];

function App() {
  const [state, dispatch] = useReducer(reducer, dummyData);
  // const [state, dispatch] = useReducer(reducer, []);

  const onCreateTodoDaily = (data) => {
    dispatch({ type: "CREATE_TODO_DAILY", data: data });
  };

  const onDeleteTodoDaily = (todoDailyId) => {
    dispatch({ type: "DELETE_TODO_DAILY", id: todoDailyId });
  };

  const onUpdateTodoDaily = (data) => {
    dispatch({ type: "UPDATE_TODO_DAILY", data: data });
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider
        value={{ onCreateTodoDaily, onDeleteTodoDaily, onUpdateTodoDaily }}
      >
        <TodoRoot />
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
export default App;
