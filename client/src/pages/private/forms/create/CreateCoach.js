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
  const [ValidateID, ValidateName] = useValidation();

  const [data, setData] = useState({
    SCHLID: "",
    CCH_FirstName: "",
    CCH_MiddleInitial: "",
    CCH_LastName: "",
    CCH_Gender: "",
    DPT_Department: "",
    CCH_Email: "",
    CCH_Contact: "",
    CCH_Facebook: "",
  });

  const [validation, setValidation] = useState({
    SCHLID: ValidateID(data.SCHLID),
    CCH_FirstName: ValidateName(data.CCH_FirstName),
    CCH_MiddleInitial: ValidateName(data.CCH_MiddleInitial),
    CCH_LastName: ValidateName(data.CCH_LastName),
  });

  const [dataChange] = useHandleChange(setData);
  useEffect(() => {
    getDepartment("department");
  }, [department]);

  useEffect(() => {
    setValidation({
      SCHLID: ValidateID(data.SCHLID),
      CCH_FirstName: ValidateName(data.CCH_FirstName),
      CCH_MiddleInitial: ValidateName(data.CCH_MiddleInitial),
      CCH_LastName: ValidateName(data.CCH_LastName),
    });
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validation.SCHLID[0].Result) {
          console.log(validation.CCH_FirstName[0].Result);
          //getCoach("add-new-coach", data);
          //navigate("/institution/coach");
        } else {
          console.log(validation.CCH_FirstName[0].Result);
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Coach"}
        description={"This module creates a coach"}
        control={
          <>
            <DefaultButton
              class="btn-primary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => {
                navigate("/institution/coach");
              }}
            />
            <DefaultButton
              class="btn-primary px-2"
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
              success={validation.CCH_FirstName[0].State[1]}
              alert={
                <>
                  <span className={"col p-0"}>
                    {validation.CCH_FirstName[0].Message}
                  </span>
                  <span className={"col p-0"}>
                    {validation.CCH_MiddleInitial[0].Message}
                  </span>
                  <span className={"col p-0"}>
                    {validation.CCH_LastName[0].Message}
                  </span>
                </>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="CCH_FirstName"
                    placeholder="First Name"
                    class={validation.CCH_FirstName[0].State[0]}
                    success={validation.CCH_FirstName[0].State[1]}
                    trigger={dataChange}
                    value={data.CCH_FirstName}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="CCH_MiddleInitial"
                    placeholder="Middle Initial"
                    class={validation.CCH_MiddleInitial[0].State[0]}
                    success={validation.CCH_MiddleInitial[0].State[1]}
                    trigger={dataChange}
                    value={data.CCH_MiddleInitial}
                    required={false}
                  />
                  <MultipleFormInputItem
                    id="CCH_LastName"
                    placeholder="Last Name"
                    class={validation.CCH_LastName[0].State[0]}
                    success={validation.CCH_LastName[0].State[1]}
                    trigger={dataChange}
                    value={data.CCH_LastName}
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
                    option="MALE"
                    group="CCH_Gender"
                    label="Male"
                    trigger={dataChange}
                    checked={data.CCH_Gender === "MALE"}
                  />
                  <RadioButton
                    id="female"
                    option="FEMALE"
                    group="CCH_Gender"
                    label="Female"
                    trigger={dataChange}
                    checked={data.CCH_Gender === "FEMALE"}
                  />
                </>
              }
            />
            <SelectButton
              id="DPT_Department"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) => (
                      <>
                        {option.DPTID === data.DPT_Department
                          ? option.DPT_Department
                          : ""}
                      </>
                    ))}
                  />
                  {department.map((option, i) => (
                    <>
                      {data.DPT_Department !== option.DPTID ? (
                        <SelectButtonItem
                          value={option.DPTID}
                          content={option.DPT_Department}
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
              label="Email & Contact"
              item={
                <>
                  <MultipleFormInputItem
                    id="CCH_Email"
                    placeholder="Email"
                    trigger={dataChange}
                    value={data.CCH_Email}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="CCH_Contact"
                    placeholder="Contact"
                    trigger={dataChange}
                    value={data.CCH_Contact}
                    required={true}
                  />
                </>
              }
            />

            <FormInput
              label="Facebook"
              id="CCH_Facebook"
              trigger={dataChange}
              value={data.CCH_Facebook}
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
            <h6>{data.CCH_FirstName}</h6>
            <h6>{data.CCH_MiddleInitial}</h6>
            <h6>{data.CCH_LastName}</h6>
            <h6>{data.CCH_Gender}</h6>
            <h6>
              {department.map((option, i) => (
                <>
                  {option.DPTID === data.DPT_Department
                    ? option.DPT_Department
                    : ""}
                </>
              ))}
            </h6>
            <h6>{data.CCH_Email}</h6>
            <h6>{data.CCH_Contact}</h6>
            <h6>{data.CCH_Facebook}</h6> */}
          </main>
        }
      />
    </form>
  );
}
