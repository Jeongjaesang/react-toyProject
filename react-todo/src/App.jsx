import React, { useReducer, useState } from "react";
import TodoRoot from "./components/TodoRoot";
import "./App.css";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "CREATE":
      break;

    default:
      return state;
  }
  return newState;
};

export const TodoStateContext = React.createContext();

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
  // const [state, dispatch] = useReducer(reducer, dummyData);
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoRoot />
    </TodoStateContext.Provider>
  );
}
export default App;
