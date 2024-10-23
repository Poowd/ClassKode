import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import useHandleChange from "../../../../../hook/useHandleChange";
import useValidation from "../../../../../hook/useValidation";
import useDatabase from "../../../../../hook/useDatabase";
import { NoDisplay } from "../../../../../component/placeholder/NoDisplay";
import useConfiguration from "../../../../../hook/useConfiguration";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";

export function CreateProjection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [yearlevel, setYearLevel] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [semester, setSemester] = useState([]);
  const [data, setData] = useState({
    AcademicYear: state.academicyear.AcademicYear,
  });
  const [selectedValues, setSelectedValues] = useState([]);

  const [dataChange] = useHandleChange(setData);
  const [current, setCurrent] = useState([]);
  const [currentacademicyear, setCurrentAcademicYear] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("program-list", setProgram);
    data_get("section-list", setSection);
    data_get("year-level-list", setYearLevel);
    data_get("semester-list", setSemester);
  }, []);

  useEffect(() => {
    //currentacademicyear.map((ay, i) => setCurrent(ay));
    setData((prev) => ({ ...prev, AcademicYear: currentacademicyear.Code }));
  }, [currentacademicyear]);

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues, data]);

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.Section !== item;
      })
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in selectedValues) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}projection-insert`,
              {
                method: "POST",
                body: JSON.stringify(selectedValues[i]),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <DataControllerTemplate
      title={"Coach Assignment"}
      description={
        "Assign a coach to a set of units and target course for this academic year"
      }
      additional={
        <main className="px-3">
          <ul>
            {selectedValues.map((item, i) => (
              <li>
                <p>{`${item.Section} - ${item.Population} students`}</p>
              </li>
            ))}
          </ul>
        </main>
      }
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
            function={submitForm}
            text="Submit"
          />
        </>
      }
      entryform={
        <>
          {program.map((program, i) => (
            <div className="p-3 rounded shadow-sm">
              <label className="d-flex align-items-center  my-2 mx-0">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span className="fs-5 fw-semibold">{program.Program}</span>
                  <div className="d-flex align-items-center gap-3">
                    <span className="">{program.AcademicLevel}</span>
                  </div>
                </div>
              </label>
              <hr />
              <main>
                {yearlevel &&
                  yearlevel.map((yearlevel, j) => (
                    <div className="d-block mb-2">
                      <div>
                        <span className="fw-normal text-secondary">
                          {yearlevel.YearLevel}
                        </span>
                      </div>
                      <div>
                        <main className="d-flex flex-wrap">
                          {section &&
                            section.map((section, k) =>
                              yearlevel.YearLevel === section.YearLevel ? (
                                program.Code === section.Program ? (
                                  <main className="w-50 p-1">
                                    <label
                                      htmlFor={k}
                                      className=" d-flex flex-wrap gap-2 align-items-center justify-content-between py-2 px-3 rounded shadow-sm"
                                    >
                                      <div className="d-flex gap-2">
                                        <span className="fw-bold">
                                          {section.Section}
                                        </span>
                                      </div>
                                      <div className="d-flex gap-2 align-items-center">
                                        <form
                                          className="d-flex gap-2 align-items-center"
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            setSelectedValues((prev) => [
                                              ...prev,
                                              {
                                                id: "SCT" + k,
                                                Section: section.Section,
                                                Population:
                                                  document.getElementById(
                                                    "SCT" + k
                                                  ).value,
                                                AcademicYear:
                                                  currentacademicyear.Code,
                                              },
                                            ]);
                                          }}
                                        >
                                          <FormInput
                                            label={null}
                                            id={"SCT" + k}
                                            class={"text-end form-control-sm"}
                                            required={true}
                                          />

                                          {document.getElementById(
                                            `SCT${k}`
                                          ) !== null ? (
                                            document.getElementById(`SCT${k}`)
                                              .value === "" ? (
                                              <DefaultButton
                                                class="btn-success"
                                                type="submit"
                                                icon={info.icons.forms.set}
                                              />
                                            ) : null
                                          ) : null}
                                        </form>

                                        {document.getElementById(`SCT${k}`) !==
                                        null ? (
                                          document.getElementById(`SCT${k}`)
                                            .value !== "" ? (
                                            <DefaultButton
                                              class="btn-danger"
                                              type="button"
                                              icon={info.icons.forms.reset}
                                              function={() => {
                                                removeItem(section.Section);
                                                document.getElementById(
                                                  `SCT${k}`
                                                ).value = "";
                                              }}
                                            />
                                          ) : null
                                        ) : null}
                                      </div>
                                    </label>
                                  </main>
                                ) : null
                              ) : null
                            )}
                        </main>
                      </div>
                    </div>
                  ))}
              </main>
            </div>
          ))}
        </>
      }
      entry={<main className="p-3"></main>}
    />
  );
}
