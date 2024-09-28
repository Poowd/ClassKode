import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import useConfiguration from "../../../../../hook/useConfiguration";
import { MainInput } from "../../../../../component/input/MainInput";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";

export function EditSection() {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [sectionName, setSectionName] = useState("");
  const [data, setData] = useState({
    Section: null,
    Program: null,
    YearLevel: null,
    Semester: "",
    Code: null,
  });

  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_post("section-target", { data: params.id }, setData);
    data_get("section-list", setSection);
    data_get("program-list", setProgram);
    data_get("year-level-list", setYearLevel);
  }, [section]);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  var counter = 0;
  const semester = ["First Semester", "Second Semester"];

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      Section: sectionName,
    }));
  }, [sectionName]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("section-edit", data, setData);
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
                      option.Code === data.Program ? option.Program : null
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
              required={false}
              disabled={true}
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
    </form>
  );
}
