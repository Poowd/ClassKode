import { useState } from "react";

export function useToasty() {
  const bootstrap = require("bootstrap");
  const toastID = document.getElementById("liveToast");
  const toastToast = bootstrap.Toast.getOrCreateInstance(toastID);

  const [toasty, setToasty] = useState({
    icon: "",
    title: "",
    content: "",
  });

  function showToast(targetIcon, targetTitle, setContent) {
    setToasty({ icon: targetIcon, title: targetTitle, content: setContent });
    toastToast.show();
    setTimeout(() => {
      toastToast.hide();
    }, 1000); // delay in seconds
  }

  return [toasty, showToast];
}
