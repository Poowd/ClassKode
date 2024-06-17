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
  const [
    a_len,
    aLength,
    a_rng,
    aRange,
    a_phn,
    aPhone,
    a_invchr,
    aInvalidCharacter,
    a_num,
    aNumerical,
  ] = useValidation();
  const [b_len, bLength, b_rng, bRange] = useValidation();

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

  const [dataChange] = useHandleChange(setData);
  useEffect(() => {
    getDepartment("department");
  }, [department]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        aLength(data.CCH_FirstName, 2, 5);
        aRange(data.SCHLID, 5, 10);
        aPhone(data.CCH_Contact);
        aInvalidCharacter(data.CCH_LastName);
        aNumerical(data.CCH_Facebook);
        if (
          aLength(data.CCH_FirstName, 2, 5) &&
          aRange(data.SCHLID, 5, 10) &&
          aPhone(data.CCH_Contact) &&
          aInvalidCharacter(data.CCH_LastName) &&
          aNumerical(data.CCH_Facebook)
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
              alert={a_rng.Message}
              success={
                a_rng.Message === "Looks Good!" ? "text-success" : "text-danger"
              }
              class={a_rng.Result}
              trigger={dataChange}
              value={data.SCHLID}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              alert={
                <div className="d-flex gap-2">
                  <p
                    className={
                      "p-0 m-0 " + a_len.Message === "Looks Good!"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {a_len.Message}
                  </p>
                  <p
                    className={
                      "p-0 m-0 " + a_invchr.Message === "Looks Good!"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {a_invchr.Message}
                  </p>
                </div>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="CCH_FirstName"
                    placeholder="First Name"
                    class={a_len.Result}
                    trigger={dataChange}
                    value={data.CCH_FirstName}
                  />
                  <MultipleFormInputItem
                    id="CCH_MiddleInitial"
                    placeholder="Middle Initial"
                    trigger={dataChange}
                    value={data.CCH_MiddleInitial}
                  />
                  <MultipleFormInputItem
                    id="CCH_LastName"
                    placeholder="Last Name"
                    class={a_invchr.Result}
                    trigger={dataChange}
                    value={data.CCH_LastName}
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
              alert={
                <div className="d-flex gap-2">
                  <p
                    className={
                      "p-0 m-0 " + a_phn.Message === "Looks Good!"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {a_phn.Message}
                  </p>
                </div>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="CCH_Email"
                    placeholder="Email"
                    trigger={dataChange}
                    value={data.CCH_Email}
                  />
                  <MultipleFormInputItem
                    id="CCH_Contact"
                    placeholder="Contact"
                    class={a_phn.Result}
                    trigger={dataChange}
                    value={data.CCH_Contact}
                  />
                </>
              }
            />

            <FormInput
              label="Facebook"
              id="CCH_Facebook"
              alert={a_num.Message}
              success={
                a_num.Message === "Looks Good!" ? "text-success" : "text-danger"
              }
              class={a_num.Result}
              trigger={dataChange}
              value={data.CCH_Facebook}
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
              <span className="d-block">
                <span>is Numeric: </span>
                {a_num.Message}
              </span>
              <span className="d-block">
                <span>is valid phone: </span>
                {a_phn.Message}
              </span>
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
