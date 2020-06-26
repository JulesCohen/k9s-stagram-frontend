import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Pusher from "pusher-js";

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

const NotifToast = (props) => {
  const [count, setcount] = useState(0);
  console.log("TOAST");

  useEffect(() => {
    console.log("TOAST EFFECT");

    Pusher.logToConsole = true;

    var pusher = new Pusher("c65d3bc16b3b7905efb1", {
      cluster: "us2",
      encrypted: true,
    });

    var channel = pusher.subscribe(`user${props.userId}`);
    channel.bind("notification", function (data) {
      console.log(data);
      toast.info(<DisplayToast message={data.message} image={data.image} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    return () => {
      console.log("disconnect");
      pusher.disconnect();
    };
  }, [props.userId]);

  return <ToastContainer style={{ fontSize: "1.6rem", color: "black" }} />;
};

export default NotifToast;
