import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";

export function CreateAssignment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [selectedValues, setSelectedValues] = useState([]);
  const coursecheckbox = document.querySelectorAll(".course-checkbox");

  const [coach, setCoach] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [course, setCourse] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [data, setData] = useState({
    SCHLID: "",
    CoachType: "",
    AcademicYear: "",
    Department: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [current, setCurrent] = useState([]);
  const [currentacademicyear, setCurrentAcademicYear] = useState([]);

  var test = [];

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("assign-list", setAssignment);
    data_get("coach-list", setCoach);
    data_get("course-list", setCourse);
    data_get("coach-type-list", setCoachType);
  }, []);

  useEffect(() => {
    //currentacademicyear.map((ay, i) => setCurrent(ay));
    setData((prev) => ({ ...prev, AcademicYear: currentacademicyear.Code }));
  }, [currentacademicyear]);

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues, data]);

  useEffect(() => {
    setSelectedValues([]);
    coursecheckbox.forEach((c) => {
      c.checked = false;
    });
    coach.map((item, i) =>
      item.SCHLID === data.SCHLID
        ? setData((prev) => ({ ...prev, Department: item.Department }))
        : null
    );
  }, [data.SCHLID]);

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.id !== item;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      data_post("assignment-insert", data, setData);
      // selectedValues.map((item, i) => {
      //   data_post("ins-spec", item, setSelectedValues);
      // });
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={handleSubmit}>
      <DataControllerTemplate
        title={"Coach Assignment"}
        description={
          "Assign a coach to a set of units and target course for this academic year"
        }
        extradata={
          <>
            <label className="p-0 m-0">
              <small>
                <span className="fw-semibold">Academic Year</span>
              </small>
            </label>
            <span className="border p-2 rounded w-100 mb-2 d-block">
              {state.academicyear.AcademicYear}
            </span>
          </>
        }
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
              label="AcademicYear"
              id="AcademicYear"
              trigger={dataChange}
              value={data.AcademicYear}
              required={true}
              disabled={true}
            />
            <MainSelect
              label="SCHLID"
              id="SCHLID"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={coach.map((option, i) => (
                      <>
                        {option.SCHLID === data.SCHLID ? option.LastName : ""}
                      </>
                    ))}
                  />
                  {coach.map((option, i) => (
                    <>
                      {data.SCHLID !== option.SCHLID ? (
                        <SelectButtonItem
                          value={option.SCHLID}
                          content={option.LastName}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />

            <MainSelect
              label="CoachType"
              id="CoachType"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={coachtype.map((option) => (
                      <>{option.Type === data.CoachType ? option.Type : ""}</>
                    ))}
                  />
                  {coachtype.map((option, i) => (
                    <>
                      {data.CoachType !== option.Type ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Type}
                          content={option.Type}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <div className="row mb-2 align-items-middle">
              <div className="col-2 pt-2">
                <span className="fw-semibold">Specialization</span>
              </div>
              <div className="col-10">
                <div
                  className="overflow-y-auto p-1 border rounded"
                  style={{ height: "25vh" }}
                >
                  {data.SCHLID !== ""
                    ? course.map((crs, j) =>
                        crs.Department === data.Department ? (
                          <div className={"form-check p-0"}>
                            <label
                              className="form-check-label px-5 py-2 w-100 rounded shadow-sm mb-2"
                              htmlFor={j}
                            >
                              {crs.Course}
                              <input
                                className="form-check-input course-checkbox"
                                type="checkbox"
                                id={j}
                                onChange={(e) => {
                                  {
                                    if (e.target.checked) {
                                      setSelectedValues((prev) => [
                                        ...prev,
                                        {
                                          id: j,
                                          SCHLID: data.SCHLID,
                                          CRS_Code: crs.CRS_Code,
                                          AcademicYear: data.AcademicYear,
                                        },
                                      ]);
                                    } else {
                                      removeItem(j);
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ) : null
                      )
                    : null}
                </div>
              </div>
            </div>

            <main className="">
              <small>
                <p className="p-0 m-0 fw-semibold mb-1"></p>
              </small>
            </main>
          </>
        }
        entry={
          <main className="p-3">
            <section>
              {/* <h6>{data.CRS_Code.length > 0 ? data.CRS_Code : "Code"}</h6>
              <h3>{data.Course.length > 0 ? data.Course : "Course"}</h3>
              <hr />
              <ul className="m-0 p-0 d-flex gap-2 mb-3">
                <li className="border m-0 p-2 rounded">
                  <p className="fst-italic text-secondary m-0 p-0"></p>
                </li>
              </ul> */}
            </section>
          </main>
        }
      />
    </form>
  );
}
