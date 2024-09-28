import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Setup() {
  const [get, post, data_get, data_post] = useDatabase();

  return <main>settings</main>;
}
