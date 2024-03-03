import PropTypes from "prop-types";
import { useContext } from "react";
import { TodoDispatchContext } from "../App";
import { createTodoDaily } from "../services/services";

const Empty = ({ curDate }) => {
  // const todoId = useRef(5);

  const { onCreateTodoDaily } = useContext(TodoDispatchContext);

  const handleOnClick = () => {
    const newTodo = createTodoDaily(curDate);
    // todoId.current += 1;
    onCreateTodoDaily(newTodo);
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
