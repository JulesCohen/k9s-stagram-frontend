import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Pusher from "pusher-js";

import "react-toastify/dist/ReactToastify.css";
import "./NotificationToast.css";

const DisplayToast = (props) => {
  return (
    <div className="toast">
      <img className="toast__img" src={props.image} alt="toast"></img>
      <p className="toast_msg">
        {props.author.userName}
        {props.message}
      </p>
    </div>
  );
};

const NotificationToast = ({ userId, handleNotification }) => {
  const notif = () => {
    handleNotification();
  };

  const refNotif = useRef();
  refNotif.current = notif;

  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("c65d3bc16b3b7905efb1", {
      cluster: "us2",
      encrypted: true,
    });

    var channel = pusher.subscribe(`user${userId}`);
    channel.bind("notification", function (data) {
      refNotif.current();
      console.log(data);
      toast.info(
        <DisplayToast
          author={data.notifCreator}
          message={data.message}
          image={data.image}
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
    });

    return () => {
      console.log("disconnect");
      pusher.disconnect();
    };
  }, [userId]);

  return (
    <ToastContainer style={{ fontSize: "1.6rem", color: "black" }} limit={5} />
  );
};

export default NotificationToast;
