import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import Avatar from "../UIElements/Avatar";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      props.handleImage(event, pickedFile);
      setFile(pickedFile);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="upload">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />

      <div className="image-upload">
        <div className={props.styles}>
          {previewUrl && props.square && <img src={previewUrl} alt="Preview" />}
          {previewUrl && !props.square && (
            <Avatar img={previewUrl} alt="Preview" size="big" />
          )}

          {!previewUrl && !props.error && (
            <FontAwesomeIcon icon={["fas", "camera"]} size="5x" />
          )}
          {!previewUrl && props.error && "Image is required"}
        </div>

        <Button type="button" onClick={pickImageHandler} size="big">
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
