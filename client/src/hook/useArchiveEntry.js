import { useNavigate } from "react-router-dom";

export default function useArchiveEntry() {
  const navigate = useNavigate();

  function ArchiveEntry(link, trigger, generated, input, data, action) {
    if (generated === input) {
      trigger(link, data, action);
      navigate(-1);
    }
  }

  return [ArchiveEntry];
}
