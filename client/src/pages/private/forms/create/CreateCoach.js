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

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("coach", coach, setCoach);
  }, [coach, department]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
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
              trigger={dataChange}
              value={data.SCHLID}
              required={true}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              item={
                <>
                  <MultipleFormInputItem
                    id="FirstName"
                    placeholder="First Name"
                    trigger={dataChange}
                    value={data.FirstName}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="MiddleInitial"
                    placeholder="Middle Initial"
                    trigger={dataChange}
                    value={data.MiddleInitial}
                    required={false}
                  />
                  <MultipleFormInputItem
                    id="LastName"
                    placeholder="Last Name"
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
              item={
                <>
                  <MultipleFormInputItem
                    id="Email"
                    placeholder="Email"
                    trigger={dataChange}
                    value={data.Email}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="Phone"
                    placeholder="Phone"
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
