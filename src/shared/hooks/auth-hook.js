import { useState, useCallback, useEffect, useRef } from "react";
// import { usePusher } from "./pusher-hook";
import Pusher from "pusher-js";
let logoutTimer;
// let pusher;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [notification, setnotification] = useState();

  const ref = useRef();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );

    console.log("LOGIN");

    Pusher.logToConsole = true;

    var pusher = new Pusher("c65d3bc16b3b7905efb1", {
      cluster: "us2",
      encrypted: true,
    });

    console.log(`user${uid}`);
    var channel = pusher.subscribe(`user${uid}`);

    channel.bind("notification", function (data) {
      // console.log(data);
      setnotification(data);
      // setTimeout(setnotification(null), 1000);
    });

    ref.current = pusher;
  }, []);

  const logout = useCallback(() => {
    ref.current.disconnect();
    localStorage.removeItem("pusherTransportTLS");
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, notification };
};
