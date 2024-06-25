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
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";
import useGetSection from "../../../../hook/useGetSection";
import axios from "axios";

export function GenerateSection() {
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
  const [sectionName, setSectionName] = useState([]);
  const [data, setData] = useState({
    Semester: "",
    YearLevel: "",
    PRG_Code: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("section", section, setSection);
    post("program", program, setProgram);
    post("yearlevel", yearlevel, setYearLevel);
    post("semester", semester, setSemester);
    post("academiclevel", academiclevel, setAcademicLevel);
  }, [section, academiclevel]);

  function getAcademicLevel() {
    for (var k = 0; k < program.length; k++) {
      if (data.PRG_Code === program[k].PRG_Code) {
        return program[k].AcademicLevel;
      }
    }
  }
  var testArray = [];
  var temp = [];
  var count = 0;
  var abbrev = "";
  const anotherarray = [];
  const [sectionlist, setSectionList] = useState([]);
  useEffect(() => {
    setSectionList([]);

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

    var asx = [];
    for (var k = 0; k < program.length; k++) {
      if (program[k].PRG_Code === data.PRG_Code) {
        abbrev = program[k].PRG_Abbreviation;
        for (var l = 0; l < 8; l++) {
          for (var f = 0; f < section.length; f++) {
            if (
              section[f].PRG_Code === data.PRG_Code &&
              section[f].YearLevel === testArray[l][1] &&
              section[f].Semester === testArray[l][2]
            ) {
              asx.push(section[f].Section);
            }
          }
          anotherarray.push({
            Section:
              program[k].PRG_Abbreviation +
              "" +
              testArray[l][0] +
              "0" +
              (asx.length + 1),
            YearLevel: testArray[l][1],
            Semester: testArray[l][2],
            Program: data.PRG_Code,
          });
          asx = [];
        }
        setSectionList(anotherarray);
      }
    }
  }, [data.PRG_Code]);

  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
    });
  }

  async function TestData(data) {
    post("generate-new-section", data, setData);
    sleep(2000);
  }
  const submit = (e) => {
    e.preventDefault();

    for (var i in sectionlist) {
      TestData(sectionlist[i]);
    }

    // sectionlist.sort(function (a, b) {
    //   return a - b;
    // });
    //sectionlist.map((item) => console.log(item));
    // sectionlist.map((item, i) => {
    //
    // });
    navigate(-1);
  };

  //console.log(sectionlist);

  // console.log(tempSection[0]);
  return (
    <form onSubmit={submit}>
      <DataControllerTemplate
        title={"Create A Generate"}
        description={"This module creates a generate"}
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
                        {option.PRG_Code === data.Program ? option.Program : ""}
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
          </>
        }
        additional={
          <>
            {section.map((section, i) =>
              section.PRG_Code === data.PRG_Code ? (
                <div>{section.Section}</div>
              ) : (
                ""
              )
            )}
          </>
        }
      />
    </form>
  );
}
