import axios from "axios";
import { useState } from "react";

export default function useDatabase() {
  const link = "http://localhost:8081/";

  function get(target, trigger) {
    axios
      .get(link.concat(target))
      .then((res) => {
        try {
          trigger(res.data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  function post(target, data, trigger) {
    axios
      .post(link.concat(target), data)
      .then((res) => {
        try {
          trigger(res.data);
          console.log(res.data.Message);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  return [get, post];
}
