import React, { useEffect, useState } from "react";
import useHandleChange from "../../hook/useHandleChange";
import useDatabase from "../../hook/useDatabase";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

export function ImagetoDB() {
  const [get, post] = useDatabase();
  const [SCHLID, setSCHLID] = useState("");
  const [file, setFile] = useState([]);
  const [retrieve, setRetrieved] = useState([]);

  // useEffect(() => {
  //   post("getimage", retrieve, setRetrieved);
  // }, []);

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    post("upload", formdata, setRetrieved);
    post("tf", { id: SCHLID.id, image: retrieve }, setRetrieved);
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
      <button className="btn btn-primary" onClick={handleUpload}>
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
