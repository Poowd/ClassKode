import axios from "axios";
import { useState } from "react";

export default function useValidation() {
  const valid = ["is-valid", "text-success"];
  const invalid = ["is-invalid", "text-danger"];
  const message = ["Looks Good!", "Looks Bad!"];
  const character = [
    {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      special: "!@#$%^&*()_+-=~`{}|:<>?[];',./'",
      numbers: "1234567890",
    },
  ];

  function Numerical(data) {
    const characters =
      character.lowercase + character.uppercase + character.special;
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

  function InvalidCharacter(data, character) {
    const characters = character;

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

  function ValidateEmpty(data) {
    if (data === "") {
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

  function ValidateID(data, min_len, max_len, min_rng, max_rng, duplicate) {
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
      Length(data, min_len, max_len) === true &&
      Range(data, min_rng, max_rng) === true &&
      Numerical(data) &&
      duplicate &&
      InvalidCharacter(
        data,
        "!@#$%^&*()_+-=~`{}|:<>?[];',./'" +
          character.uppercase +
          character.lowercase
      )
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

  function ValidateCodeID(data, min_len, max_len, duplicate) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len) === true && duplicate) {
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

  function ValidateName(data, min_len, max_len) {
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
      Length(data, min_len, max_len) &&
      InvalidCharacter(data, "!@#$%^&*()_+-=~`{}|:<>?[];',./'1234567890")
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

  function ValidateEmail(data, min_len, max_len, duplicate) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len) && duplicate) {
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

  function ValidatePhone(data, min_len, max_len, duplicate) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len) && Numerical(data) && duplicate) {
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

  function ValidateLink(data, min_len, max_len, duplicate) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len) && duplicate) {
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

  function ValidateCode(data, min_len, max_len, code) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len) && code === data) {
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

  function ValidateTitle(data, min_len, max_len) {
    if (data === "") {
      return [
        {
          Result: null,
          State: "",
          Message: "",
        },
      ];
    }
    if (Length(data, min_len, max_len)) {
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

  function Base() {
    return [
      {
        Result: false,
        State: "",
        Message: "",
      },
    ];
  }

  return [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ];
}
