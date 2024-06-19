import axios from "axios";
import { useState } from "react";

export default function usePost() {
  const [data, setData] = useState([]);
  const link = "http://localhost:8081/";

  function postServer(target, data) {
    axios
      .post(link.concat(target), data)
      .then((res) => {
        try {
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  return [data, setData, postServer];
}
