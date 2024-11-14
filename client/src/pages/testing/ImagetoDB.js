import React, { useEffect, useState } from "react";
import useDatabase from "../../hook/useDatabase";

export function ImagetoDB() {
  const [get, post, data_get, data_post] = useDatabase();
  const [SCHLID, setSCHLID] = useState({
    name: "asda",
  });
  const [file, setFile] = useState([]);
  const [retrieve, setRetrieved] = useState([]);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("image", file);
    data_post("upload", formdata, setRetrieved);
  }, [file]);

  const handleUpload = () => {
    data_post("tf", { id: SCHLID.id, image: retrieve }, setRetrieved);
  };
  return (
    <>
      <input
        type="file"
        id="what"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/png, image/jpeg"
      />
      <input
        type="text"
        id="SCHLID"
        name="SCHLID"
        onChange={(e) => setSCHLID({ id: e.target.value })}
      />
      <button className="btn primary-gradient" onClick={handleUpload}>
        Save
      </button>
      {/* <img
        src={
          retrieve[0].image === undefined
            ? null
            : `http://localhost:8081/images/${retrieve[0].image}`
        }
      /> */}
    </>
  );
}
