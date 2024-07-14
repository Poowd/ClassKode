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
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";
import useGetSection from "../../../../hook/useGetSection";

export function EditSection() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [data, setData] = useState({
    SCTID: state.data[0].SCTID,
    Section: state.data[0].Section,
    Semester: state.data[0].Semester,
    YearLevel: state.data[0].YearLevel,
    PRG_Code: state.data[0].PRG_Code,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("section", section, setSection);
    post("program", program, setProgram);
    post("yearlevel", yearlevel, setYearLevel);
    post("semester", semester, setSemester);
    post("academiclevel", academiclevel, setAcademicLevel);
  }, [section, academiclevel]);

  var testArray = [];
  var temp = [];
  var count = 0;

  function getAcademicLevel() {
    for (var k = 0; k < program.length; k++) {
      if (data.PRG_Code === program[k].PRG_Code) {
        return program[k].AcademicLevel;
      }
    }
  }

  useEffect(() => {
    for (var k = 0; k < program.length; k++) {
      for (var i = 0; i < yearlevel.length; i++) {
        if (
          program[k].AcademicLevel === yearlevel[i].AcademicLevel &&
          data.PRG_Code === program[k].PRG_Code
        ) {
          for (var j = 0; j < semester.length; j++) {
            count++;
            testArray.push([
              count,
              yearlevel[i].YearLevel,
              semester[j].Semester,
            ]);
          }
        }
      }
    }

    for (var f = 0; f < section.length; f++) {
      if (
        section[f].PRG_Code === data.PRG_Code &&
        section[f].YearLevel === data.YearLevel &&
        section[f].Semester === data.Semester
      ) {
        temp.push(section[f].Section);
      }
    }

    for (var k = 0; k < program.length; k++) {
      for (var i = 0; i < yearlevel.length; i++) {
        if (data.PRG_Code === program[k].PRG_Code) {
          for (var l = 0; l < testArray.length; l++) {
            if (
              testArray[l].includes(data.YearLevel, 1) &&
              testArray[l].includes(data.Semester, 2)
            ) {
              setSectionName(
                program[k].PRG_Abbreviation +
                  "" +
                  testArray[l][0] +
                  "0" +
                  (temp.length + 1)
              );
            }
          }
        }
      }
    }
  }, [data.PRG_Code, data.Semester, data.YearLevel]);

  // useEffect(() => {
  //   setData((prev) => ({
  //     ...prev,
  //     Section: sectionName,
  //   }));
  // }, [sectionName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        post("update-existing-section", data, setData);
        navigate("/institution/section");
      }}
    >
      <DataControllerTemplate
        title={"Create A Section"}
        description={"This module creates a section"}
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
            <SelectButton
              label="Program"
              id="PRG_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) => (
                      <>
                        {option.PRG_Code === data.PRG_Code
                          ? option.Program
                          : ""}
                      </>
                    ))}
                  />
                  {program.map((option, i) => (
                    <>
                      {data.Program !== option.PRG_Code ? (
                        <SelectButtonItem
                          value={option.PRG_Code}
                          content={option.Program}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />

            <SelectButton
              label="Year Level"
              id="YearLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={yearlevel.map((option, i) => (
                      <>
                        {option.YearLevel === data.YearLevel
                          ? option.YearLevel
                          : ""}
                      </>
                    ))}
                  />
                  {yearlevel.map((option, i) => (
                    <>
                      {data.YearLevel !== option.YearLevel &&
                      getAcademicLevel() === option.AcademicLevel ? (
                        <SelectButtonItem
                          value={option.YearLevel}
                          content={option.YearLevel}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />

            <SelectButton
              label="Semester"
              id="Semester"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={semester.map((option, i) => (
                      <>
                        {option.Semester === data.Semester
                          ? option.Semester
                          : ""}
                      </>
                    ))}
                  />
                  {semester.map((option, i) => (
                    <>
                      {data.Semester !== option.Semester ? (
                        <SelectButtonItem
                          value={option.Semester}
                          content={option.Semester}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />

            <FormInput
              label="Section"
              id="Section"
              trigger={dataChange}
              value={data.Section}
              required={true}
            />
          </>
        }
        additional={<>{console.log()}</>} //sectionName
      />
    </form>
  );
}
