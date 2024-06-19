import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import usePost from "../../../../hook/usePost";
import useHandleChange from "../../../../hook/useHandleChange";

export function EditCoach() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [coach, setCoach, getCoach] = usePost();

  const [data, setData] = useState({
    CCHID: state.data[0].CCHID,
    SCHLID: state.data[0].SCHLID,
    FirstName: state.data[0].FirstName,
    MiddleInitial: state.data[0].MiddleInitial,
    LastName: state.data[0].LastName,
    Gender: state.data[0].Gender,
    Department: state.data[0].DPT_Code,
    Email: state.data[0].Email,
    Phone: state.data[0].Phone,
    Facebook: state.data[0].Facebook,
  });
  const [postdata, setPostData, postServer] = usePost();
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    postServer("department");
  }, [postdata]);

  return (
    <form
      onSubmit={() => {
        getCoach("update-existing-coach", data);
        navigate("/institution/coach");
      }}
    >
      <DataControllerTemplate
        title={"Edit A Coach"}
        description={"This module edits a coach"}
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
              class={""}
              trigger={dataChange}
              value={data.SCHLID}
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
                  />
                  <MultipleFormInputItem
                    id="MiddleInitial"
                    placeholder="Middle Initial"
                    trigger={dataChange}
                    value={data.MiddleInitial}
                  />
                  <MultipleFormInputItem
                    id="LastName"
                    placeholder="Last Name"
                    trigger={dataChange}
                    value={data.LastName}
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
              option={
                <>
                  <SelectButtonItemSelected
                    content={postdata.map((option, i) =>
                      data.Department === option.DPT_Code
                        ? option.Department
                        : ""
                    )}
                  />
                  {postdata.map((option, i) => (
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
                  />
                  <MultipleFormInputItem
                    id="Phone"
                    placeholder="Phone"
                    trigger={dataChange}
                    value={data.Phone}
                  />
                </>
              }
            />
            <FormInput
              label="Facebook"
              id="Facebook"
              class={""}
              trigger={dataChange}
              value={data.Facebook}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
