import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Logs() {
  const [get, post, data_get, data_post] = useDatabase();

  return <div>logs</div>;
}
