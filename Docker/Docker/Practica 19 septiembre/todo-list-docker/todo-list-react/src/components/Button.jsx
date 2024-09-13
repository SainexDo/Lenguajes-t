const Button = ({ type, handleClick, text }) => {
  return (
    <button type={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
