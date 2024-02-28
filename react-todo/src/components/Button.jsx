import PropTypes from "prop-types";

const Button = ({ type, text, onClick }) => {
  const btnType = ["create", "delete"].includes(type) ? type : "default";

  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: "default",
};

export default Button;
