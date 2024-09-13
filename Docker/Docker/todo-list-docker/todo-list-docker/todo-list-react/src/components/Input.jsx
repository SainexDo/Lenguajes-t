import { forwardRef } from "react";

const Input = forwardRef(({ type, value, placeholder, handleClick }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      placeholder={placeholder}
      onClick={handleClick}
    />
  );
});

Input.displayName = "Input";

export default Input;
