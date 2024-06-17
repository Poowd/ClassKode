import axios from "axios";
import { useState } from "react";

export default function useValidation() {
  const [length, setLength] = useState({
    Result: "",
    Message: "",
  });
  const [range, setRange] = useState([]);
  const [phone, setPhone] = useState([]);
  const [invalidcharacter, setInvalidCharacter] = useState([]);
  const [numerical, setNumerical] = useState([]);
  const [duplicate, setDuplicate] = useState([]);

  function Numerical(data) {
    const characters = ["a", "b"];
    for (var i = 0; i <= characters.length - 1; i++) {
      if (data.includes(characters[i])) {
        setNumerical({
          Result: "is-invalid",
          Message: "The input is not a number or may contain letter/s",
        });
        return false;
      }
    }
    setNumerical({
      Result: "is-valid",
      Message: "Looks Good!",
    });
    return true;
  }

  function InvalidCharacter(data) {
    const invalid = ["!", "@"];

    for (var i = 0; i <= invalid.length - 1; i++) {
      if (data.includes(invalid[i])) {
        setInvalidCharacter({
          Result: "is-invalid",
          Message: "There are any of the following: !@#$%^&*()_+-=`~",
        });
        return false;
      }
    }
    setInvalidCharacter({
      Result: "is-valid",
      Message: "Looks Good!",
    });
    return true;
  }

  function Phone(data) {
    if (data.substring(0, 2) !== "09") {
      setPhone({
        Result: "is-invalid",
        Message: "Phone number starts with ' 09 '",
      });
      return false;
    }
    setPhone({
      Result: "is-valid",
      Message: "Looks Good!",
    });
    return true;
  }

  function Range(data, min, max) {
    if (Math.floor(parseFloat(data)) < min) {
      setRange({
        Result: "is-invalid",
        Message: "Minimum Value (" + min + ")",
      });
      return false;
    }
    if (Math.floor(parseFloat(data)) > max) {
      setRange({
        Result: "is-invalid",
        Message: "Maximum Value (" + max + ")",
      });
      return false;
    }
    setRange({
      Result: "is-valid",
      Message: "Looks Good!",
    });
    return true;
  }

  function Length(data, min, max) {
    if (data.length < min) {
      setLength({
        Result: "is-invalid",
        Message: "Minimum Character (" + min + ")",
      });
      return false;
    }
    if (data.length > max) {
      setLength({
        Result: "is-invalid",
        Message: "Maximum Character (" + max + ")",
      });
      return false;
    }
    setLength({
      Result: "is-valid",
      Message: "Looks Good!",
    });
    return true;
  }

  return [
    length,
    Length,
    range,
    Range,
    phone,
    Phone,
    invalidcharacter,
    InvalidCharacter,
    numerical,
    Numerical,
  ];
}
