import axios from "axios";
import { useState } from "react";
import { PassiveModal } from "../component/modal/PassiveModal";

export default function useModal() {
  const bootstrap = require("bootstrap");
  const [modalcontent, setModalContent] = useState({
    Title: "",
    SubTitle: "",
  });

  let Modal = null;
  function getModal(id) {
    if (!Modal) {
      Modal = new bootstrap.Modal(document.getElementById(id));
    }
    return Modal;
  }

  function showModal(id, title, content) {
    setModalContent({
      Title: title,
      Content: content,
    });
    getModal(id).show();
  }

  function hideModal(id) {
    getModal(id).hide();
  }

  return [modalcontent, showModal, hideModal, getModal];
}
