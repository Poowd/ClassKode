import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { DefaultInput } from "../../../../component/input/DefaultInput";

export function CreateAssignment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [selectedValues, setSelectedValues] = useState([]);
  const coursecheckbox = document.querySelectorAll(".course-checkbox");

  const [coach, setCoach] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [course, setCourse] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [data, setData] = useState({
    SCHLID: "",
    CoachType: "",
    ACY_Code: state.academicyear.ACY_Code,
    DPT_Code: "",
  });

  const [dataChange] = useHandleChange(setData);

  var test = [];
  useEffect(() => {
    post("coach", coach, setCoach);
    post("course", course, setCourse);
    post("coachtype", coachtype, setCoachType);
    post("assignment", assignment, setAssignment);
  }, []);

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
        ? setData((prev) => ({ ...prev, DPT_Code: item.DPT_Code }))
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
          post("add-new-assignment", data, setData);
          selectedValues.map((item, i) => {
            post("add-new-specialization", item, setSelectedValues);
          });
          navigate(-1);
        }
      }}
    >
      <main className="h-100 p-2">
        <header>
          <h3 className="m-0 p-0">Coach Assignment</h3>
          <p className="m-0 p-0 text-secondary">
            Assign a coach to a set of units and target course for this academic
            year
          </p>
          <hr className="p-0 mx-0 my-2" />
        </header>
        <main className="">
          <div className="d-flex gap-2 my-2">
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
          </div>
          <section className="">
            <main className="row m-0">
              <section className="col-6 p-0">
                <label className="p-0 m-0">
                  <small>
                    <span className="fw-semibold">Academic Year</span>
                  </small>
                </label>
                <span className="border p-2 rounded w-100 mb-2 d-block">
                  {state.academicyear.AcademicYear}
                </span>

                <SelectButton
                  label="SCHLID"
                  id="SCHLID"
                  trigger={dataChange}
                  required={true}
                  option={
                    <>
                      <SelectButtonItemSelected
                        content={coach.map((option, i) => (
                          <>
                            {option.SCHLID === data.SCHLID
                              ? option.LastName
                              : ""}
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
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </>
                  }
                />

                <SelectButton
                  label="CoachType"
                  id="CoachType"
                  trigger={dataChange}
                  required={true}
                  option={
                    <>
                      <SelectButtonItemSelected
                        content={coachtype.map((option, i) => (
                          <>
                            {option.CoachType === data.CoachType
                              ? option.CoachType
                              : ""}
                          </>
                        ))}
                      />
                      {coachtype.map((option, i) => (
                        <>
                          {data.CoachType !== option.CoachType ? (
                            <SelectButtonItem
                              value={option.CoachType}
                              content={option.CoachType}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </>
                  }
                />
              </section>
              <section className="col-6 p-0 px-2">
                <main className="">
                  <small>
                    <p className="p-0 m-0 fw-semibold mb-1">specialization</p>
                  </small>
                  <div
                    className="overflow-y-auto px-1"
                    style={{ height: "50vh" }}
                  >
                    {data.SCHLID !== ""
                      ? course.map((crs, j) =>
                          crs.DPT_Code === data.DPT_Code ? (
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
                                            ACY_Code: data.ACY_Code,
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
                </main>
              </section>
            </main>
          </section>
        </main>
      </main>
    </form>
  );
}
