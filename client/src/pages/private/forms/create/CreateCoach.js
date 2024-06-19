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
  const [department, setDepartment, getDepartment] = usePost();
  const [coach, setCoach, getCoach] = usePost();
  const [ValidateID, ValidateName, ValidateEmail, ValidatePhone, ValidateLink] =
    useValidation();

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
    SCHLID: ValidateID(data.SCHLID),
    FirstName: ValidateName(data.FirstName),
    MiddleInitial: ValidateName(data.MiddleInitial),
    LastName: ValidateName(data.LastName),
    Email: ValidateEmail(data.Email),
    Phone: ValidatePhone(data.Phone),
    Facebook: ValidateLink(data.Facebook),
  });

  const [dataChange] = useHandleChange(setData);
  useEffect(() => {
    getDepartment("department");
  }, [department]);

  useEffect(() => {
    setValidation({
      SCHLID: ValidateID(data.SCHLID, 11, 11, 2000000000, 3000000000),
      FirstName: ValidateName(data.FirstName, 2, 100),
      MiddleInitial: ValidateName(data.MiddleInitial, 1, 100),
      LastName: ValidateName(data.LastName, 2, 100),
      Email: ValidateEmail(data.Email, 2, 100),
      Phone: ValidatePhone(data.Phone, 11, 11),
      Facebook: ValidateLink(data.Facebook, 2, 100),
    });
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
          getCoach("add-new-coach", data);
          navigate("/institution/coach");
        } else {
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
              function={() => {
                navigate("/institution/coach");
              }}
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
        additional={
          <main className="px-3">
            <h6>Errors:</h6>
            <small>
              <h6>ID</h6>
            </small>
            <p className="p-0 m-0">
              {/* <span className="d-block">
                <span>is Numeric: </span>
                {a_num.Message}
              </span>
              <span className="d-block">
                <span>is valid phone: </span>
                {a_phn.Message}
              </span> */}
            </p>
            {/* <h6>{data.SCHLID}</h6>
            <h6>{data.FirstName}</h6>
            <h6>{data.MiddleInitial}</h6>
            <h6>{data.LastName}</h6>
            <h6>{data.Gender}</h6>
            <h6>
              {department.map((option, i) => (
                <>
                  {option.DPTID === data.Department
                    ? option.Department
                    : ""}
                </>
              ))}
            </h6>
            <h6>{data.Email}</h6>
            <h6>{data.Phone}</h6>
            <h6>{data.Facebook}</h6> */}
          </main>
        }
      />
    </form>
  );
}
