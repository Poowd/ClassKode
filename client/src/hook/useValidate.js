import axios from "axios";
import { useState } from "react";
import useValidation from "./useValidation";

export default function useValidate() {
  const [
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
  ] = useValidation();

  function ValidateCoach(
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    dupe1,
    dupe2,
    dupe3,
    dupe4,
    trigger
  ) {
    trigger({
      SCHLID: ValidateID(item1, 11, 11, 2000000000, 3000000000, dupe1),
      FirstName: ValidateName(item2, 2, 100),
      MiddleInitial: ValidateName(item3, 1, 100),
      LastName: ValidateName(item4, 2, 100),
      Gender: ValidateEmpty(item5),
      Email: ValidateEmail(item6, 2, 100, dupe2),
      Phone: ValidatePhone(item7, 11, 11, dupe3),
      Facebook: ValidateLink(item8, 2, 100, dupe4),
    });
  }

  function ValidateDepartment(item1, item2, item3, item4, dupe1, trigger) {
    trigger({
      DPT_Code: ValidateCodeID(item1, 3, 25, dupe1),
      Department: ValidateName(item2, 5, 100),
      DPT_Abbreviation: ValidateName(item3, 2, 25),
      DPT_Description: ValidateName(item4, 0, 255),
    });
  }

  function ValidateProgram(item1, item2, item3, item4, dupe1, trigger) {
    trigger({
      PRG_Code: ValidateCodeID(item1, 3, 25, dupe1),
      Program: ValidateName(item2, 5, 100),
      PRG_Abbreviation: ValidateName(item3, 2, 25),
      PRG_Description: ValidateName(item4, 0, 255),
    });
  }

  function ValidateCourse(item1, item2, dupe1, trigger) {
    trigger({
      CRS_Code: ValidateCodeID(item1, 3, 25, dupe1),
      Course: ValidateTitle(item2, 5, 100),
    });
  }

  return [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse];
}
