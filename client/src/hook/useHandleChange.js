import axios from "axios";
import { useState } from "react";

export default function useHandleChange(trigger) {
  const dataChange = (e) => {
    trigger((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return [dataChange];
}
