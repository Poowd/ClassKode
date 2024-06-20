import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import usePost from "../../../../hook/usePost";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";

export function CreateCoach() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    SCHLID: "",
    FirstName: "",
    MiddleInitial: "",
    LastName: "",
    Gender: "",
    Department: "",
    Email: "",
    Phone: "",
    Facebook: "",
  });

  const [department, setDepartment, getDepartment] = usePost();
  const [coaches, setCoaches, getCoaches] = usePost();
  const [coach, setCoach, getCoach] = usePost();
  const [
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
  ] = useValidation();

  const [dataChange] = useHandleChange(setData);

  const [validation, setValidation] = useState({
    SCHLID: ValidateID(data.SCHLID),
    FirstName: ValidateName(data.FirstName),
    MiddleInitial: ValidateName(data.MiddleInitial),
    LastName: ValidateName(data.LastName),
    Email: ValidateEmail(data.Email),
    Phone: ValidatePhone(data.Phone),
    Facebook: ValidateLink(data.Facebook),
  });

  useEffect(() => {
    getDepartment("department");
    getCoaches("coach");
  }, [department]);

  useEffect(() => {
    setValidation({
      SCHLID: ValidateID(
        data.SCHLID,
        11,
        11,
        2000000000,
        3000000000,
        schl_dupe()
      ),
      FirstName: ValidateName(data.FirstName, 2, 100),
      MiddleInitial: ValidateName(data.MiddleInitial, 1, 100),
      LastName: ValidateName(data.LastName, 2, 100),
      Email: ValidateEmail(data.Email, 2, 100, email_dupe()),
      Phone: ValidatePhone(data.Phone, 11, 11, phone_dupe()),
      Facebook: ValidateLink(data.Facebook, 2, 100, facebook_dupe()),
    });
  }, [data]);

  function schl_dupe() {
    for (var i = 0; i < coaches.length; i++) {
      if (
        coaches[i].SCHLID === data.SCHLID &&
        coaches[i].CCHID !== data.CCHID
      ) {
        return false;
      }
    }
    return true;
  }

  function email_dupe() {
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].Email === data.Email) {
        return false;
      }
    }
    return true;
  }

  function phone_dupe() {
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].Phone === data.Phone) {
        return false;
      }
    }
    return true;
  }

  function facebook_dupe() {
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].Facebook === data.Facebook) {
        return false;
      }
    }
    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          validation.SCHLID[0].Result &&
          validation.FirstName[0].Result &&
          validation.MiddleInitial[0].Result &&
          validation.LastName[0].Result &&
          validation.Email[0].Result &&
          validation.Phone[0].Result &&
          validation.Facebook[0].Result
        ) {
          getCoach("add-new-coach", data);
          navigate("/institution/coach");
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Coach"}
        description={"This module creates a coach"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        content={
          <>
            <FormInput
              label="School ID"
              id="SCHLID"
              alert={validation.SCHLID[0].Message}
              class={validation.SCHLID[0].State[0]}
              success={validation.SCHLID[0].State[1]}
              trigger={dataChange}
              value={data.SCHLID}
              required={true}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              alert={
                <>
                  <span
                    className={"col p-0 " + validation.FirstName[0].State[1]}
                  >
                    {validation.FirstName[0].Message}
                  </span>
                  <span
                    className={
                      "col p-0 " + validation.MiddleInitial[0].State[1]
                    }
                  >
                    {validation.MiddleInitial[0].Message}
                  </span>
                  <span
                    className={"col p-0 " + validation.LastName[0].State[1]}
                  >
                    {validation.LastName[0].Message}
                  </span>
                </>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="FirstName"
                    placeholder="First Name"
                    class={validation.FirstName[0].State[0]}
                    success={validation.FirstName[0].State[1]}
                    trigger={dataChange}
                    value={data.FirstName}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="MiddleInitial"
                    placeholder="Middle Initial"
                    class={validation.MiddleInitial[0].State[0]}
                    success={validation.MiddleInitial[0].State[1]}
                    trigger={dataChange}
                    value={data.MiddleInitial}
                    required={false}
                  />
                  <MultipleFormInputItem
                    id="LastName"
                    placeholder="Last Name"
                    class={validation.LastName[0].State[0]}
                    success={validation.LastName[0].State[1]}
                    trigger={dataChange}
                    value={data.LastName}
                    required={true}
                  />
                </>
              }
            />

            <RadioGroup
              label="Gender"
              selection={
                <>
                  <RadioButton
                    id="male"
                    option="Male"
                    group="Gender"
                    label="Male"
                    trigger={dataChange}
                    checked={data.Gender === "Male"}
                  />
                  <RadioButton
                    id="female"
                    option="Female"
                    group="Gender"
                    label="Female"
                    trigger={dataChange}
                    checked={data.Gender === "Female"}
                  />
                </>
              }
            />
            <SelectButton
              id="Department"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) => (
                      <>
                        {option.DPT_Code === data.Department
                          ? option.Department
                          : ""}
                      </>
                    ))}
                  />
                  {department.map((option, i) => (
                    <>
                      {data.Department !== option.DPT_Code ? (
                        <SelectButtonItem
                          value={option.DPT_Code}
                          content={option.Department}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MultipleFormInput
              label="Email & Phone"
              alert={
                <>
                  <span className={"col p-0 " + validation.Email[0].State[1]}>
                    {validation.Email[0].Message}
                  </span>
                  <span className={"col p-0 " + validation.Phone[0].State[1]}>
                    {validation.Phone[0].Message}
                  </span>
                </>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="Email"
                    placeholder="Email"
                    class={validation.Email[0].State[0]}
                    success={validation.Email[0].State[1]}
                    trigger={dataChange}
                    value={data.Email}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="Phone"
                    placeholder="Phone"
                    class={validation.Phone[0].State[0]}
                    success={validation.Phone[0].State[1]}
                    trigger={dataChange}
                    value={data.Phone}
                    required={true}
                  />
                </>
              }
            />

            <FormInput
              label="Facebook"
              id="Facebook"
              alert={validation.Facebook[0].Message}
              class={validation.Facebook[0].State[0]}
              success={validation.Facebook[0].State[1]}
              trigger={dataChange}
              value={data.Facebook}
              required={true}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
