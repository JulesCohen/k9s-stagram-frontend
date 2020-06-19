import React from "react";

import "./Input.css";
const Input = ({ label, name, type, register, required, error }) => {
  return (
    <div className={"form__input"}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} ref={register(required)} />
      {error && `${label} is required`}
    </div>
  );
};

export default Input;
