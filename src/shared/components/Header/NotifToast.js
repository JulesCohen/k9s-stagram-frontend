import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import "react-toastify/dist/ReactToastify.css";

import "./NotifToast.css";

const DisplayToast = (props) => {
  return (
    <div className="div-toast">
      <img src={props.image} alt="toast"></img>
      <p>{props.message}</p>
    </div>
  );
};

const NotifToast = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log(auth.notification.message);

    const notify = () => {
      toast.info(
        // auth.notification,
        <DisplayToast
          message={auth.notification.message}
          image={auth.notification.image}
        />,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    };
    notify();
  }, [auth.notification]);
  return <ToastContainer style={{ fontSize: "1.6rem", color: "black" }} />;
};

export default NotifToast;
