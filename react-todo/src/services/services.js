export const copyCategory = (category) => {
  const arr = [];
  for (let i = 0; i < category.length; i++) {
    const newTodo_item = { ...category[i] };
    arr.push(newTodo_item);
  }
  return arr;
};

export const copyTodo_daily = (curTodo_daily) => {
  const newCurTodo_daily = {
    id: curTodo_daily.id,
    createdAt: curTodo_daily.createdAt,
    not_started: copyCategory(curTodo_daily.not_started),
    in_progress: copyCategory(curTodo_daily.in_progress),
    done: copyCategory(curTodo_daily.done),
  };
  return newCurTodo_daily;
};

export const copyState = (state) => {
  const newState = [];
  for (let i = 0; i < state.length; i++) {
    newState.push(copyTodo_daily(state[i]));
  }
  return newState;
};
