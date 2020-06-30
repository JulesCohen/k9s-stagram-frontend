import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Spinner from "../../shared/components/UIElements/Spinner";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./AuthPage.css";
// import Input from "../../shared/UIElements/Input";

const AuthPage = () => {
  // let history = useHistory();
  const auth = useContext(AuthContext);
  const [loginMode, setloginMode] = useState(true);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const { isLoading, sendRequest } = useHttpClient();
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleChange = (event, image) => {
    console.log(event.target.files[0]);
    setValue("image", image, true);
  };

  const onSubmit = async (data) => {
    if (loginMode) {
      try {
        const res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(res.userId);
        auth.login(res.userId, res.token);
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const formData = new FormData();

        console.log(formData);

        formData.append("userName", data.userName);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("image", data.image);
        const res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData
        );
        auth.login(res.userId, res.token);
      } catch (err) {
        alert(err);
      }
    }
  };

  const switchMode = () => {
    setloginMode(!loginMode);
  };

  return (
    <div className={"auth"}>
      {isLoading && <Spinner asOverlay />}
      <div className="auth__container">
        <div className="auth__header">{loginMode ? "LOGIN" : "SIGNUP"}</div>
        <form onSubmit={handleSubmit(onSubmit)} className={"auth__form"}>
          <div className="signin">
            {!loginMode && (
              <>
                <Controller
                  as={<ImageUpload styles={"preview-round"} />}
                  name={"image"}
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  handleImage={handleChange}
                />
                {errors.image && "image is required"}
              </>
            )}

            <div className="signin__inputs">
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
            </div>
          </div>

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

          <Button size="big">{loginMode ? "LOGIN" : "SIGNUP"}</Button>

          {loginMode ? (
            <p>
              You don't have an account? Please{" "}
              <span onClick={switchMode} className={"signupSwitch"}>
                SIGNUP.
              </span>
            </p>
          ) : (
            <p>
              Already have an account? Please{" "}
              <span onClick={switchMode} className={"signupSwitch"}>
                LOGIN.
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
