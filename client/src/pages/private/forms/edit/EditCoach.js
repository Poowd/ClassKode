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
    CCH_FirstName: state.data[0].CCH_FirstName,
    CCH_MiddleInitial: state.data[0].CCH_MiddleInitial,
    CCH_LastName: state.data[0].CCH_LastName,
    CCH_Gender: state.data[0].CCH_Gender,
    DPT_Department: state.data[0].DPTID,
    CCH_Email: state.data[0].CCH_Email,
    CCH_Contact: state.data[0].CCH_Contact,
    CCH_Facebook: state.data[0].CCH_Facebook,
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
              class={""}
              trigger={dataChange}
              value={data.SCHLID}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              item={
                <>
                  <MultipleFormInputItem
                    id="CCH_FirstName"
                    placeholder="First Name"
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
                    content={postdata.map((option, i) =>
                      data.DPT_Department === option.DPTID
                        ? option.DPT_Department
                        : ""
                    )}
                  />
                  {postdata.map((option, i) => (
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
                  />
                  <MultipleFormInputItem
                    id="CCH_Contact"
                    placeholder="Contact"
                    trigger={dataChange}
                    value={data.CCH_Contact}
                  />
                </>
              }
            />
            <FormInput
              label="Facebook"
              id="CCH_Facebook"
              class={""}
              trigger={dataChange}
              value={data.CCH_Facebook}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
