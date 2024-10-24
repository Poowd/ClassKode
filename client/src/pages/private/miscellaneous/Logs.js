import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Logs() {
  const [get, post, data_get, data_post] = useDatabase();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    data_get("logs-list", setLogs);
  }, []);

  return (
    <main className="w-100 h-100 overflow-y-auto border rounded">
      <ul className="list-group list-group-flush">
        {logs.map((log, i) => (
          <li className="list-group-item d-flex w-100">
            <p className="m-0">{`[ ${log.Created} ] ${log.Action} - ${log.Module} , ${log.User} : ${log.Details}`}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
