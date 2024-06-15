import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { useLocation, useParams } from "react-router-dom";

export function ViewCoach() {
  const params = useParams();
  const { state } = useLocation();
  const [data, setData] = useState([state.data]);

  return (
    <main>
      {params.module}
      {data.map((index, i) => (
        <main key={i}>
          <span>{index.CCH_FirstName}</span>
        </main>
      ))}
    </main>
  );
}
