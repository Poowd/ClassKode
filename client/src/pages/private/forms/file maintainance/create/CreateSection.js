import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";

export function CreateSection() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [sectionName, setSectionName] = useState("");
  const [data, setData] = useState({
    Section: "",
    Program: "",
    YearLevel: "",
    Semester: "",
    Code: "",
  });

  const [sectionlist, setSectionList] = useState([]);
  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("section-list", setSection);
    data_get("program-list", setProgram);
    data_get("year-level-list", setYearLevel);
  }, [section]);

  var counter = 0;
  const semester = ["First Semester", "Second Semester"];

  const getSectionDuplicates = (template) => {
    var len = 0;
    section.forEach((sect) => {
      if (sect.Program === data.Program) {
        if (sect.Section.includes(template)) {
          ++len;
        }
      }
    });

    if (len < 10) {
      return `0${++len}`;
    } else {
      return ++len;
    }
  };

  useEffect(() => {
    program.forEach((prg) => {
      yearlevel.forEach((yrl) => {
        semester.forEach((sem) => {
          if (prg.Code === data.Program) {
            counter++;
            if (yrl.YearLevel === data.YearLevel) {
              if (sem === data.Semester) {
                setSectionName(
                  `${prg.Abbrev}${counter}${getSectionDuplicates(
                    `${prg.Abbrev}${counter}`
                  )}`
                );
              }
            }
          }
        });
      });
    });
  }, [data]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      Section: sectionName,
    }));
  }, [sectionName]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("section-insert", data, setData);
      showToast(
        info.icons.others.info,
        "Section",
        `Section ${data.Section} is saved!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
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
            <MainSelect
              label="Program"
              id="Program"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) =>
                      option.Program === data.Code ? option.Program : null
                    )}
                  />
                  {program.map((option, i) =>
                    data.Program !== option.Program ? (
                      <SelectButtonItem
                        value={option.Code}
                        content={option.Program}
                      />
                    ) : null
                  )}
                </>
              }
            />
            <MainSelect
              label="YearLevel"
              id="YearLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={yearlevel.map((option, i) =>
                      option.YearLevel === data.YearLevel
                        ? option.YearLevel
                        : null
                    )}
                  />
                  {yearlevel.map((option, i) =>
                    data.YearLevel !== option.YearLevel ? (
                      <SelectButtonItem
                        value={option.YearLevel}
                        content={option.YearLevel}
                      />
                    ) : null
                  )}
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
                    content={semester.map((option, i) =>
                      option === data.Semester ? option : null
                    )}
                  />
                  {semester.map((option, i) =>
                    data.Semester !== option ? (
                      <SelectButtonItem value={option} content={option} />
                    ) : null
                  )}
                </>
              }
            />
            <MainInput
              label="Section"
              id="Section"
              trigger={dataChange}
              value={data.Section}
              required={true}
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
