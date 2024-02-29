import PropTypes from "prop-types";
import Menu from "./Menu";
import { useEffect, useRef, useState } from "react";

const TodoItem = ({ title }) => {
  const menuRef = useRef(null);
  const [isMenu, setIsMenu] = useState(false);

  const handleIsMenu = () => {
    setIsMenu((prev) => !prev);
  };

  useEffect(() => {
    // **useRef를 활용하여 외부 클릭시 메뉴 창 닫히게 하기
    const onClickOutSideMenu = (e) => {
      if (isMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        //메뉴창이 열려있고 클릭한 곳이 메뉴창이 아니라면 닫히게 한다.
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", onClickOutSideMenu);
    // 화면 전체가 클릭을 인식할 수 있도록 document에 이벤트 핸들러를 달아줌
    return () => {
      document.removeEventListener("mousedown", onClickOutSideMenu);
      // 창이 닫힐 때, 이벤트 핸들러 제거 해줌으로써 메모리 누수 방지
    };
  }, [isMenu]);

  return (
    <li className="TodoItem">
      <span>{title}</span>
      <div className="menu_mark" onClick={handleIsMenu}>
        <span>...</span>
      </div>
      {isMenu && <Menu ref={menuRef} />}
    </li>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
};
export default TodoItem;
