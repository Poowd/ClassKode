import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function GenerateSection() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
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
    post("gen-section", data, setData);
    sleep(2000);
  }
  
  const submit = (e) => {
    e.preventDefault();
    for (var i in sectionlist) {
      TestData(sectionlist[i]);
    }
    navigate(-1);
  };

  return (
    <form className="h-100" onSubmit={submit}>
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
          </>
        }
        entry={
          <main className="p-3">
            <section className="row m-0 p-0">
              {section.map((section, i) =>
                section.PRG_Code === data.PRG_Code ? (
                  <div className="col-2 p-1 m-0">
                    <div className="border rounded p-2">{section.Section}</div>
                  </div>
                ) : (
                  ""
                )
              )}
            </section>
          </main>
        }
        additional={<></>}
      />
    </form>
  );
}
