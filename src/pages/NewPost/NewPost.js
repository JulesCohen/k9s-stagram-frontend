import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/ImageUpload";
import Spinner from "../../shared/UIElements/Spinner";

import "./NewPost.css";

const Input = ({ label, name, type, register, required, error }) => {
  return (
    <div className={"auth-form__input"}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} ref={register(required)} />
      {error && `${label} is required`}
    </div>
  );
};

const NewPost = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleChange = (event, image) => {
    console.log(event.target.files[0]);
    setValue("image", image, true);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      console.log(formData);

      formData.append("userId", auth.userId);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("image", data.image);
      const res = await sendRequest(
        "http://localhost:5000/api/posts",
        "POST",
        formData
      );
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="newpost">
      {isLoading && <Spinner asOverlay />}
      <form onSubmit={handleSubmit(onSubmit)} className={"newpost__form"}>
        <>
          <Controller
            as={<ImageUpload styles={"image-upload__preview-square"} />}
            name={"image"}
            control={control}
            defaultValue=""
            rules={{ required: true }}
            handleImage={handleChange}
          />
          {errors.image && "image is required"}
        </>

        <div className={"newpost__form__input"}>
          <Input
            name={"location"}
            label={"Location"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.location}
          />
          <Input
            name={"description"}
            label={"Description"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.description}
          />

          <button className={""}>Post</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
