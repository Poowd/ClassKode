import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Logs() {
  const [get, post, data_get, data_post] = useDatabase();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    data_get("logs-list", setLogs);
  }, []);

  return (
    <main className="w-100 h-100 overflow-y-auto p-2">
      <section className="bg-white rounded shadow-sm p-3">
        <table className="table">
          <thead>
            <tr className="fw-semibold text-center">
              <td>Date</td>
              <td>Time</td>
              <td>Action</td>
              <td>Module</td>
              <td>School ID</td>
              <td>User</td>
              <td>Type</td>
              <td>Academic Code</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr className="text-center">
                <td>{log.Date}</td>
                <td>{log.Time}</td>
                <td>{log.Action}</td>
                <td>{log.Module}</td>
                <td>{log.SCHLID}</td>
                <td>{`${log.LastName}, ${log.FirstName}`}</td>
                <td>{log.UserType}</td>
                <td>{log.AcademicCode}</td>
                <td>{log.Details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
