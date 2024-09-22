import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Logs() {
  const [get, post, data_get, data_post] = useDatabase();
  const [testdata, setTestData] = useState([]);

  useEffect(() => {
    data_post("test-data", testdata, setTestData);
  }, []);

  return (
    <div className="h-100 w-25">
      <ul className="list-group">
        {testdata &&
          testdata.map((item, i) => (
            <li className="list-group-item">{item.Email}</li>
          ))}
      </ul>
      <p>{`The total number of the _user table: ${testdata.length} rows`}</p>
    </div>
  );
}
