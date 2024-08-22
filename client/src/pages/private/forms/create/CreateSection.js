import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function CreateSection() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [data, setData] = useState({
    Section: sectionName,
    Semester: "",
    YearLevel: "",
    PRG_Code: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-sect", section, setSection);
    post("sel-prg", program, setProgram);
    post("sel-yrlvl", yearlevel, setYearLevel);
    post("sel-sem", semester, setSemester);
    post("sel-acyl", academiclevel, setAcademicLevel);
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

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      Section: sectionName,
    }));
  }, [sectionName]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-sct", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
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
        entryform={
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
              trigger={() =>
                setSectionName(document.getElementById("Section").value)
              }
              value={sectionName}
              required={true}
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.Section.length > 0 ? data.Section : "Section"}</h6>
              <h3>{data.Section.length > 0 ? data.Section : "Section"} </h3>
              <hr />
              <ul className="m-0 p-0 d-flex gap-2 mb-3">
                <li className="border m-0 p-2 rounded">
                  <p className="m-0 p-0">
                    {program.map((prog, i) =>
                      prog.PRG_Code === data.PRG_Code ? prog.Program : null
                    )}
                  </p>
                </li>
              </ul>
              <main className="row m-0 p-0 mt-3 mb-2">
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Floor:{" "}
                    {data.YearLevel.length > 0 ? data.YearLevel : "YearLevel"}
                  </p>
                </section>
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Building:{" "}
                    {data.Semester.length > 0 ? data.Semester : "Semester"}
                  </p>
                </section>
              </main>
            </section>
          </main>
        }
      />
    </form>
  );
}
