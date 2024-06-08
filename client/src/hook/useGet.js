import axios from "axios";
import { useState } from "react";

export default function useGet() {
  const [data, setData] = useState([]);
  const link = "http://localhost:8081/";

  function getServer(target) {
    axios
      .get(link.concat(target))
      .then((res) => {
        try {
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  return [data, setData, getServer];
}
