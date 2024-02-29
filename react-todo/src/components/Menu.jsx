import { forwardRef } from "react";

const menuList = [
  { id: 1, title: "오늘 하기" },
  { id: 2, title: "삭제하기" },
];

const Menu = forwardRef(function MyInput(props, ref) {
  return (
    <ul className="Menu" ref={ref}>
      {menuList.map((menu) => (
        <li key={menu.id}>{menu.title}</li>
      ))}
    </ul>
  );
});

export default Menu;
