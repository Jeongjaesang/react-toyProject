import React, { useReducer, useState } from "react";
import TodoRoot from "./components/TodoRoot";
import "./App.css";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "CREATE": {
      // 완전한 복사는 아닌데 이래도 되나 싶다. 완전한 복사는 JSON을 사용할 수 있다는데 비용이 많이 드는 연산이라고..
      const newData = {
        id: action.data.id,
        createdAt: action.data.createdAt,
        not_started: [...action.data.not_started],
        in_progress: [...action.data.in_progress],
        done: [...action.data.done],
      };
      newState = [...state, newData];
      break;
    }

    default:
      return state;
  }
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoDDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    createdAt: "Wed Feb 28 2024",
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

  const onCreate = (data) => {
    dispatch({ type: "CREATE", data: data });
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDDispatchContext.Provider value={{ onCreate }}>
        <TodoRoot />
      </TodoDDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
export default App;
