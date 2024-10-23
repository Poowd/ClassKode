import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useValidation from "../../../../../hook/useValidation";

export function CreateCourse() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [data, setData] = useState({
    Code: "",
    Course: "",
    Department: "",
    Description: "",
  });
  const [validation, setValidation] = useState({
    Code: "",
    Course: "",
    Department: "",
    Description: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_get("course-list", setCourse);
  }, []);

  const checkDuplicateCode = (code) => {
    for (var i = 0; i < course.length; i++) {
      if (course[i].Code === code) {
        setValidation((prev) => ({
          ...prev,
          Code: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setValidation((prev) => ({
      ...prev,
      Code: ValiAI("Code", data.Code),
      Course: ValiAI("Name", data.Course),
      Department: ["is-valid", "valid-feedback", "Looks Good!"],
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("Code", data.Code) &&
      trueValiAIBool("Name", data.Course) &&
      !checkDuplicateCode(data.Code)
    ) {
      data_post("course-insert", data, setData);
      showToast(
        info.icons.others.info,
        "Course",
        `Course ${data.Course} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Course"}
        description={"This module creates a course"}
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
        entryform={
          <>
            <MainInput
              class={`${validation.Code[0]}`}
              label="Code"
              id="Code"
              trigger={dataChange}
              value={data.Code}
              feedbackstatus={`${validation.Code[1]}`}
              feedback={`${
                validation.Code[2] !== undefined ? validation.Code[2] : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.Course[0]}`}
              label="Course"
              id="Course"
              trigger={dataChange}
              value={data.Course}
              feedbackstatus={`${validation.Course[1]}`}
              feedback={`${
                validation.Course[2] !== undefined ? validation.Course[2] : ""
              }`}
              required={true}
            />
            <MainSelect
              class={`${validation.Department[0]}`}
              label="Department"
              id="Department"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) =>
                      option.Code === data.Department ? option.Department : null
                    )}
                  />
                  {department.map((option, i) => (
                    <>
                      {data.Department !== option.Code ? (
                        <SelectButtonItem
                          value={option.Code}
                          content={option.Department}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainInput
              class={`${validation.Description[0]}`}
              label="Description"
              id="Description"
              trigger={dataChange}
              value={data.Description}
              required={false}
            />
          </>
        }
        entry={<main className="p-3"></main>}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}
