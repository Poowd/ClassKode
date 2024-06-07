import React, { useState } from "react";

export default function useConfiguration() {
  const [data, setData] = useState();

  return [data, setData];
}
