import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";

export function CreateAcademicYear() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [curriculum, setCurriculum] = useState([]);
  const [semester, setSemester] = useState([]);
  const [academicCode, setAcademicCode] = useState("");

  const [data, setData] = useState({
    Code: "",
    AcademicYear: "",
    Curriculum: "",
    Semester: "",
    StartDate: "",
    EndDate: "",
    AcademicCode: "",
    Description: "",
  });
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
    data_get("semester-list", setSemester);
  }, []);

  const generateAcademicCode = (e) => {
    e.preventDefault();
    data_get("academic-code-generator", setAcademicCode);
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, AcademicCode: academicCode }));
  }, [academicCode]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      try {
        const response = await fetch(
          `${info.conn.server}academic-year-insert`,
          {
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const entry = await response.json();
        console.log(entry);
        if (entry.Status === "Success") {
          data_post("academic-year-code-insert", entry.data, setData);
        }
      } catch (error) {
        console.log(error);
      }
      showToast(
        info.icons.others.info,
        "AcademicYear",
        `AcademicYear ${data.AcademicYear} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Academic Year"}
        description={"This module creates a academic year"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.navigation.back}
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
              label="Code"
              id="Code"
              trigger={dataChange}
              value={data.Code}
              required={true}
            />
            <MainInput
              label="AcademicYear"
              id="AcademicYear"
              trigger={dataChange}
              value={data.AcademicYear}
              required={true}
            />
            <MainSelect
              label="Curriculum"
              id="Curriculum"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={curriculum.map((option) =>
                      option.Code === data.Curriculum ? option.Curriculum : null
                    )}
                  />
                  {curriculum.map((option, i) => (
                    <>
                      {data.Curriculum !== option.Code ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Code}
                          content={option.Curriculum}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Semester"
              id="Semester"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={semester.map((option) =>
                      option.Semester === data.Semester ? option.Semester : null
                    )}
                  />
                  {semester.map((option, i) => (
                    <>
                      {data.Semester !== option.Semester ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Semester}
                          content={option.Semester}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainInput
              label="StartDate"
              id="StartDate"
              trigger={dataChange}
              value={data.StartDate}
              required={true}
            />
            <MainInput
              label="EndDate"
              id="EndDate"
              trigger={dataChange}
              value={data.EndDate}
              required={true}
            />
            <MainInput
              label="AcademicCode"
              id="AcademicCode"
              trigger={dataChange}
              value={data.AcademicCode}
              required={true}
            />
            <main className="w-100 d-flex justify-content-end mb-2">
              <DefaultButton
                class="btn-primary px-2 py-2"
                type="button"
                text="Generate Code"
                function={generateAcademicCode}
              />
            </main>
            <MainInput
              label="Description"
              id="Description"
              trigger={dataChange}
              value={data.Description}
              required={false}
            />
          </>
        }
        additional={<></>}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}
