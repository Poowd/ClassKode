import axios from "axios";
import { useState } from "react";

export default function useValidation() {
  const valid = ["is-valid", "text-success"];
  const invalid = ["is-invalid", "text-danger"];
  const message = ["Looks Good!", "Looks Bad!"];

  function Numerical(data) {
    const characters =
      "!@#$%^&*()_+-=`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklomnopqrstuvwxyz";
    for (var i = 0; i <= characters.length - 1; i++) {
      if (data.length === 0) {
        return null;
      }
      if (data.includes(characters[i])) {
        return false;
      }
    }
    return true;
  }

  function InvalidCharacter(data) {
    const invalid = "!@#$%^&*()_+-=`~1234567890";

    for (var i = 0; i <= invalid.length - 1; i++) {
      if (data.length === 0) {
        return null;
      }
      if (data.includes(invalid[i])) {
        return false;
      }
    }
    return true;
  }

  function Phone(data) {
    if (data.length === 0) {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (data.substring(0, 2) !== "09") {
      return [
        {
          Result: false,
          State: invalid,
          Message: message[1],
        },
      ];
    }
    return [
      {
        Result: true,
        State: valid,
        Message: message[0],
      },
    ];
  }

  function Range(data, min, max) {
    if (Math.floor(parseFloat(data)) === 0) {
      return null;
    }
    if (Math.floor(parseFloat(data)) < min) {
      return false;
    }
    if (Math.floor(parseFloat(data)) > max) {
      return false;
    }

    return true;
  }

  function Length(data, min, max) {
    if (data.length === 0) {
      return null;
    }
    if (data.length < min) {
      return false;
    }
    if (data.length > max) {
      return false;
    }
    return true;
  }

  function ValidateID(data) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (
      Length(data, 11, 11) === true &&
      Range(data, 2000000000, 3000000000) === true &&
      Numerical(data)
    ) {
      return [
        {
          Result: true,
          State: valid,
          Message: message[0],
        },
      ];
    }
    return [
      {
        Result: false,
        State: invalid,
        Message: message[1],
      },
    ];
  }

  function ValidateName(data) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, 2, 150) && InvalidCharacter(data)) {
      return [
        {
          Result: true,
          State: valid,
          Message: message[0],
        },
      ];
    }
    return [
      {
        Result: false,
        State: invalid,
        Message: message[1],
      },
    ];
  }

  return [ValidateID, ValidateName];
}
