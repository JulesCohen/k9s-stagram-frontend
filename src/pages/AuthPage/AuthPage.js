import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "./AuthPage.css";

const Input = ({ label, name, type, register, required }) => {
  return (
    <div className={"auth-form__input"}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} ref={register(required)} />
    </div>
  );
};

const AuthPage = () => {
  let history = useHistory();

  const [loginMode, setloginMode] = useState(true);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    history.push("/");
    console.log(data);
  };

  const switchMode = () => {
    setloginMode(!loginMode);
  };

  return (
    <div className={"auth"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"auth-form"}>
        {!loginMode && (
          <>
            <Input
              name={"username"}
              label={"Username"}
              type={"text"}
              register={register}
              required={{ required: true, minLength: 2 }}
            />
            {errors.firstName && "Username is required"}
          </>
        )}
        {!loginMode && (
          <>
            <Input
              name={"firstName"}
              label={"First Name"}
              type={"text"}
              register={register}
              required={{ required: true, minLength: 2 }}
            />
            {errors.firstName && "First name is required"}
          </>
        )}
        {!loginMode && (
          <>
            <Input
              name={"lastName"}
              label={"Last Name"}
              type={"text"}
              register={register}
              required={{ required: true, minLength: 2 }}
            />
            {errors.lastName && "Last name is required"}
          </>
        )}
        <>
          <Input
            name={"email"}
            label={"Email"}
            type={"email"}
            register={register}
            required={{ required: true, minLength: 2 }}
          />
          {errors.email && "Email is required"}
        </>
        <>
          <Input
            name={"password"}
            label={"Password"}
            type={"password"}
            register={register}
            required={{ required: true, minLength: 6 }}
          />
          {errors.password && "Password is required"}
        </>

        <button className={"auth-form__submit"}>
          {loginMode ? "LOGIN" : "SIGNUP"}
        </button>

        {loginMode ? (
          <p>
            You don't have an account? Please{" "}
            <span onClick={switchMode} className={"signupSwitch"}>
              Sign Up.
            </span>
          </p>
        ) : (
          <p>
            Already have an account? Please{" "}
            <span onClick={switchMode} className={"signupSwitch"}>
              Log in.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthPage;
