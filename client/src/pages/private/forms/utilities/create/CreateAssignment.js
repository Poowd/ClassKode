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
import useConfiguration from "../../../../../hook/useConfiguration";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function CreateAssignment() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [selectedValues, setSelectedValues] = useState([]);
  const coursecheckbox = document.querySelectorAll(".course-checkbox");
  const [info] = useConfiguration();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

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
  console.log(selectedValues);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("assign-list", setAssignment);
    data_get("coach-list", setCoach);
    data_get("coach-type-list", setCoachType);
    data_get("course-list", setCourse);
  }, []);

  const removeDuplicates = (data) => {
    const uniqueEntries = new Map();
    data.forEach((entry) => {
      const key = `${entry.CourseID}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  useEffect(() => {
    //currentacademicyear.map((ay, i) => setCurrent(ay));
    setData((prev) => ({ ...prev, AcademicYear: params.id }));
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
        ? setData((prev) => ({ ...prev, Department: item.Code }))
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (true) {
      data_post("assignment-insert", data, setData);
      for (var i in selectedValues) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}specialization-insert`,
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
      setTimeout(() => {
        recordLog(
          "Added an Assignment Entry",
          "Assignment Module",
          `A user added an entry with an ID ${data.SCHLID}`
        );
        showModal(
          "StatusModal",
          "",
          <main className="d-flex flex-column">
            <section className="text-center">
              <h1 className="text-success">{info.icons.status.success}</h1>
              <h3 className="text-success fw-bold">Success</h3>
              <button
                type="button"
                class="btn safe-color mt-3"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </section>
          </main>
        );
        navigate(-1);
      }, 1000); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={handleSubmit}>
      <DataControllerTemplate
        title={info.text.moduleText.assignment.create}
        description={info.text.moduleText.assignment.createDescrition}
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
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="safe-color px-2"
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
                    content={coach.map((option) => (
                      <>
                        {option.SCHLID === data.SCHLID ? option.LastName : ""}
                      </>
                    ))}
                  />
                  {coach.map((option, i) => (
                    <>
                      {data.SCHLID !== option.SCHLID ? (
                        <SelectButtonItem
                          key={i}
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

            <main className="">
              <small>
                <p className="p-0 m-0 fw-semibold mb-1"></p>
              </small>
            </main>
          </>
        }
        additional={
          <main className="p-3">
            <section>
              <span className="fw-semibold">Specialization</span>
              <div
                className="overflow-y-auto p-1 border rounded"
                style={{ height: "60vh" }}
              >
                {data.SCHLID !== ""
                  ? removeDuplicates(course).map((crs, j) => (
                      <div key={j} className={"form-check p-0"}>
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
                                      Course: crs.CourseID,
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
                    ))
                  : null}
              </div>
            </section>
          </main>
        }
      />
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main>{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
    </form>
  );
}
