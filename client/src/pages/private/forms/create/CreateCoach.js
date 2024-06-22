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
import useDatabase from "../../../../hook/useDatabase";
import useValidate from "../../../../hook/useValidate";

export function CreateCoach() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
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

  const [department, setDepartment] = useState([]);
  const [coach, setCoach] = useState([]);
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
  const [validation, setValidation] = useState({
    SCHLID: Base(data.SCHLID),
    FirstName: Base(data.FirstName),
    MiddleInitial: Base(data.MiddleInitial),
    LastName: Base(data.LastName),
    Gender: Base(data.Gender),
    Email: Base(data.Email),
    Phone: Base(data.Phone),
    Facebook: Base(data.Facebook),
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("department", department, setDepartment);
    post("coach", coach, setCoach);
  }, [coach, department]);

  useEffect(() => {
    ValidateCoach(
      data.SCHLID,
      data.FirstName,
      data.MiddleInitial,
      data.LastName,
      data.Gender,
      data.Email,
      data.Phone,
      data.Facebook,
      schl_dupe(),
      email_dupe(),
      phone_dupe(),
      facebook_dupe(),
      setValidation
    );
  }, [data]);

  function schl_dupe() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].SCHLID === data.SCHLID && coach[i].CCHID !== data.CCHID) {
        return false;
      }
    }
    return true;
  }

  function email_dupe() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].Email === data.Email) {
        return false;
      }
    }
    return true;
  }

  function phone_dupe() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].Phone === data.Phone) {
        return false;
      }
    }
    return true;
  }

  function facebook_dupe() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].Facebook === data.Facebook) {
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
          validation.Gender[0].Result &&
          validation.Email[0].Result &&
          validation.Phone[0].Result &&
          validation.Facebook[0].Result
        ) {
          post("add-new-coach", data, setData);
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
              label="Department"
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
