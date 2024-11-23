import { useState } from "react";
import useDatabase from "./useDatabase";

export function useLogs() {
  const dateObject = new Date();
  const [get, post, data_get, data_post] = useDatabase();
  const loggeduser = JSON.parse(sessionStorage.getItem("user"));
  const [logs, setLogs] = useState([]);

  const recordLog = (action, module, details) => {
    data_post(
      "log-me",
      {
        Action: action,
        Module: module,
        User: loggeduser.SCHLID,
        Details: details,
        Date: `${dateObject.getMonth()}-${dateObject.getDate()}-${dateObject.getFullYear()}`,
        Time: `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`,
      },
      setLogs
    );
  };

  return [recordLog];
}
