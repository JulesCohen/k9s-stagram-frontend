import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import "./NewPost.css";

// import Autocomplete from "./Autocomplete";
import Input from "../../shared/components/FormElements/Input";
import Spinner from "../../shared/components/UIElements/Spinner";
const NewPost = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const { isLoading, sendRequest } = useHttpClient();

  const handleChange = (event, image) => {
    console.log(event.target.files[0]);
    setValue("image", image, true);
  };
  // const handleSelect = (address) => {
  //   setValue("location", address, true);
  // };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      console.log(formData);

      formData.append("userId", auth.userId);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("image", data.image);
      await sendRequest("http://localhost:5000/api/posts", "POST", formData);
      history.push(`/${auth.userId}/posts`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="newpost">
      {isLoading && <Spinner asOverlay />}
      <form onSubmit={handleSubmit(onSubmit)} className={"newpost__form"}>
        <Controller
          as={
            <ImageUpload
              styles={"image-upload__preview-square"}
              error={errors.image}
            />
          }
          name={"image"}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          handleImage={handleChange}
        />

        <div className={"newpost__form__input"}>
          {/* <Controller
            as={
              <Autocomplete
                onSelect={handleSelect}
                onInput={handleSelect}
                error={errors.location}
              />
            }
            control={control}
            rules={{ required: true, minLength: 3 }}
            name="location"
            defaultValue=""
          /> */}

          <Input
            name={"location"}
            label={"Location"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.description}
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
