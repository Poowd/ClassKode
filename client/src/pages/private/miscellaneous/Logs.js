import React from "react";
import vid from "../../../assets/videos/duk.mp4";

export function Logs() {
  return (
    <div className="h-100">
      <video className="h-100" controls>
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
