import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";
import Spinner from "../../shared/components/UIElements/Spinner";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import TextareaAutosize from "react-textarea-autosize";

import "./NewPost.css";

// import Autocomplete from "./Autocomplete";
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

      // console.log(formData);

      formData.append("userId", auth.userId);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("image", data.image);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
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
      <div className="newpost_container">
        <div className="newpost_header">New Post</div>
        <form onSubmit={handleSubmit(onSubmit)} className={"newpost__form"}>
          <div className="newpost_preview">
            <Controller
              as={
                <ImageUpload
                  styles={"preview-square"}
                  error={errors.image}
                  square
                />
              }
              name={"image"}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              handleImage={handleChange}
            />
          </div>

          <div className={"newpost__inputs"}>
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

            {/* <Input
            name={"description"}
            label={"Description"}
            type={"text"}
            register={register}
            required={{ required: true, minLength: 2 }}
            error={errors.description}
          /> */}

            <div className="newpost__description">
              <p>Description</p>
              <TextareaAutosize
                name={"description"}
                label={"Description"}
                // type={"text"}
                ref={register({ required: true, minLength: 2 })}
              />
              {errors.description && "Description is required"}
            </div>

            <Button size="big" type="submit">
              POST
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
