import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div>
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
          {previewUrl && <img src={previewUrl} alt="Preview" />}

          {!previewUrl && !props.error && (
            <FontAwesomeIcon icon={["fas", "camera"]} size="5x" />
          )}
          {!previewUrl && props.error && "Image is required"}
        </div>
        <button
          type="button"
          onClick={pickImageHandler}
          className="button-pick"
        >
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
