import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import ImageUpload from "../../shared/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../shared/ImageUpload.css";
import "./AuthPage.css";

const Input = ({ label, name, type, register, required, error }) => {
  return (
    <div className={"auth-form__input"}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} ref={register(required)} />
      {error && `${label} is required`}
    </div>
  );
};

const AuthPage = () => {
  let history = useHistory();

  const [loginMode, setloginMode] = useState(true);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleChange = (event, image) => {
    console.log(event.target.files[0]);
    setValue("image", image, true);
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const formData = new FormData();

      console.log(formData);

      formData.append("userName", data.userName);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image);
      await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        formData
        // {
        //   Authorization: "Bearer " + auth.token
        // }
      );
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

  const switchMode = () => {
    setloginMode(!loginMode);
  };

  return (
    <div className={"auth"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"auth-form"}>
        {!loginMode && (
          <Input
            name={"userName"}
            label={"Username"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.userName}
          />
        )}
        {!loginMode && (
          <Input
            name={"firstName"}
            label={"First Name"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.firstName}
          />
        )}
        {!loginMode && (
          <Input
            name={"lastName"}
            label={"Last Name"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.lastName}
          />
        )}
        <Input
          name={"email"}
          label={"Email"}
          type={"email"}
          register={register}
          required={{ required: true, minLength: 2 }}
          error={errors.email}
        />
        <Input
          name={"password"}
          label={"Password"}
          type={"password"}
          register={register}
          required={{ required: true, minLength: 6 }}
          error={errors.password}
        />
        {!loginMode && (
          <>
            <Controller
              as={ImageUpload}
              name={"image"}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              handleImage={handleChange}
            />
            {errors.image && "image is required"}
          </>
        )}

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
