const menuList = [
  { id: 1, title: "오늘 하기" },
  { id: 2, title: "삭제하기" },
];

const Menu = () => {
  return (
    <ul className="Menu">
      {menuList.map((menu) => (
        <li key={menu.id}>{menu.title}</li>
      ))}
    </ul>
  );
};

export default Menu;
