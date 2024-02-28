import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { TodoDDispatchContext } from "../App";

const createTodo = (curDate, todoId) => {
  return {
    id: todoId,
    createdAt: curDate,
    not_started: [],
    in_progress: [],
    done: [],
  };
};

const Empty = ({ curDate }) => {
  const todoId = useRef(5);

  const { onCreate } = useContext(TodoDDispatchContext);

  const handleOnClick = () => {
    const newTodo = createTodo(curDate, todoId.current);
    todoId.current += 1;
    onCreate(newTodo);
    console.log("handleOnClick");
  };

  return (
    <div className="view Empty">
      <div className="Empty_wrapper">
        <div className="img_wrapper">
          <img
            src={import.meta.env.VITE_PUBLIC_URL + `assets/empty_emoji.png`}
          />
        </div>
        <h2>작성한 Todo가 없습니다.</h2>
        <h3 onClick={handleOnClick}>Todo 작성하러가기</h3>
      </div>
    </div>
  );
};

Empty.propTypes = {
  curDate: PropTypes.string.isRequired,
};

export default Empty;
