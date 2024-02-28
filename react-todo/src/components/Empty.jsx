const Empty = () => {
  return (
    <div className="view Empty">
      <div className="Empty_wrapper">
        <div className="img_wrapper">
          <img
            src={import.meta.env.VITE_PUBLIC_URL + `assets/empty_emoji.png`}
          />
        </div>
        <h2>작성한 Todo가 없습니다.</h2>
        <h3>Todo 작성하러가기</h3>
      </div>
    </div>
  );
};

export default Empty;
