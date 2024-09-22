import axios from "axios";
import { useState } from "react";

export default function useDatabase() {
  const link = "http://localhost:8081/";
  const origin = "http://localhost:8081/";

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
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  async function data_get(link, target) {
    try {
      const response = await fetch(origin.concat(link), {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      try {
        target(data);
      } catch (error) {}
    } catch (error) {}
  }
  async function data_post(link, values, target) {
    try {
      const response = await fetch(origin.concat(link), {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      try {
        target(data);
      } catch (error) {}
    } catch (error) {}
  }

  return [get, post, data_get, data_post];
}
