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

export function EditCoach() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(state.data);
  const [postdata, setPostData, postServer] = usePost();

  useEffect(() => {
    postServer("department");
  }, [postdata]);

  return (
    <form onSubmit={() => {}}>
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
        content={data.map((item, i) => (
          <>
            <FormInput
              label="School ID"
              id="a"
              class={""}
              value={item.SCHLID}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              item={
                <>
                  <MultipleFormInputItem
                    id="a"
                    placeholder="First Name"
                    value={item.CCH_FirstName}
                  />
                  <MultipleFormInputItem
                    id="b"
                    placeholder="Middle Initial"
                    value={item.CCH_MiddleInitial}
                  />
                  <MultipleFormInputItem
                    id="c"
                    placeholder="Last Name"
                    value={item.CCH_LastName}
                  />
                </>
              }
            />
            <RadioGroup
              label="Gender"
              selection={
                <>
                  <RadioButton
                    id="ab"
                    group="asd"
                    label="Male"
                    checked={item.CCH_Gender === "MALE" ? true : false}
                  />
                  <RadioButton
                    id="ab"
                    group="asd"
                    label="Female"
                    checked={item.CCH_Gender === "FEMALE" ? true : false}
                  />
                </>
              }
            />
            <SelectButton
              option={
                <>
                  <SelectButtonItemSelected content={item.DPT_Department} />
                  {postdata.map((option, i) => (
                    <>
                      {item.DPT_Department !== option.DPT_Department ? (
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
                    id="a"
                    placeholder="Email"
                    value={item.CCH_Email}
                  />
                  <MultipleFormInputItem
                    id="b"
                    placeholder="Contact"
                    value={item.CCH_Contact}
                  />
                </>
              }
            />
            <FormInput
              label="Facebook"
              id="a"
              class={""}
              value={item.CCH_Facebook}
            />
          </>
        ))}
        additional={<></>}
      />
    </form>
  );
}
