import { useState } from "react";

import Pusher from "pusher-js";

export const usePusher = () => {
  const [notification, setnotification] = useState();

  const setPusher = (userId) => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("c65d3bc16b3b7905efb1", {
      cluster: "us2",
      encrypted: true,
    });

    var channel = pusher.subscribe(`user${userId}`);

    channel.bind("notification", function (data) {
      alert(data.message);
      setnotification(data.message);
    });
  };

  return { setPusher, notification };
};
