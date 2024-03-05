import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { TodoDispatchContext } from "../App";
import { createTodoDaily } from "../services/services";

const Empty = ({ curDate }) => {
  const { onCreateTodoDaily } = useContext(TodoDispatchContext);

  const handleOnClick = useCallback(() => {
    const newTodo = createTodoDaily(curDate);
    onCreateTodoDaily(newTodo);
  }, [curDate, onCreateTodoDaily]);

  return (
    <div className="view Empty">
      <div className="Empty_wrapper">
        <div className="img_wrapper">
          <img
            src={import.meta.env.VITE_PUBLIC_URL + `assets/empty_emoji.png`}
          />
        </div>
        <div className="Empty_text_wrapper">
          <h2>작성한 Todo가 없습니다.</h2>
          <h3 onClick={handleOnClick}>Todo 작성하러가기</h3>
        </div>
      </div>
    </div>
  );
};

Empty.propTypes = {
  curDate: PropTypes.string.isRequired,
};

export default Empty;
