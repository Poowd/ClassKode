import React, { useEffect } from "react";
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

export function CreateCoach() {
  const navigate = useNavigate();
  const [postdata, setPostData, postServer] = usePost();

  useEffect(() => {
    postServer("department");
  }, [postdata]);

  return (
    <form onSubmit={() => {}}>
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
              id="a"
              class={""}
              placeholder="School ID"
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              item={
                <>
                  <MultipleFormInputItem id="a" placeholder="First Name" />
                  <MultipleFormInputItem id="b" placeholder="Middle Initial" />
                  <MultipleFormInputItem id="c" placeholder="Last Name" />
                </>
              }
            />
            <RadioGroup
              label="Gender"
              selection={
                <>
                  <RadioButton id="ab" group="asd" label="Male" />
                  <RadioButton id="ab" group="asd" label="Female" />
                </>
              }
            />
            <SelectButton
              option={
                <>
                  <SelectButtonItemSelected />
                  {postdata.map((option, i) => (
                    <SelectButtonItem
                      value={option.DPTID}
                      content={option.DPT_Department}
                    />
                  ))}
                </>
              }
            />
            <MultipleFormInput
              label="Email & Contact"
              item={
                <>
                  <MultipleFormInputItem id="a" placeholder="Email" />
                  <MultipleFormInputItem id="b" placeholder="Contact" />
                </>
              }
            />
            <FormInput
              label="Facebook"
              id="a"
              class={""}
              placeholder="Facebook"
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
