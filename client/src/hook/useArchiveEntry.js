import { useNavigate } from "react-router-dom";
import useDatabase from "./useDatabase";

export default function useArchiveEntry() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  function ArchiveEntry(link, trigger, generated, input, data, action) {
    if (generated === input) {
      post(link, data, action);
      navigate(-1);
    }
  }

  return [ArchiveEntry];
}
