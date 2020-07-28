import React from "react";
import "./Input.css";

const Input = ({
  label,
  name,
  type,
  register,
  required,
  error,
  placeholder,
}) => {
  return (
    <div className={"form__control"}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        ref={register(required)}
        placeholder={placeholder}
      />
      {error && <p className="form__error">{label} is required</p>}
    </div>
  );
};

export default Input;
