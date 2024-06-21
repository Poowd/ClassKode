import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useArchiveEntry() {
  const navigate = useNavigate();

  function ArchiveEntry(link, trigger, generated, input, data) {
    if (generated === input) {
      trigger(link, data);
      navigate(-1);
    }
  }

  return [ArchiveEntry];
}
