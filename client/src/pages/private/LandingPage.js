import React, { useEffect, useState } from "react";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import useHandleChange from "../../hook/useHandleChange";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import { SelectButtonItemSelected } from "../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../component/dropdown/select/SelectButtonItem";
import useModal from "../../hook/useModal";
import { PassiveModal } from "../../component/modal/PassiveModal";
import { SelectButton } from "../../component/dropdown/select/SelectButton";
import useTimeFormat from "../../hook/useTimeFormat";

export function LandingPage() {
  const [convertMinutes] = useTimeFormat();
  const daytoday = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const navigate = useNavigate();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [data, setData] = useState({
    Input: "",
    Confirm: "",
    Section: "",
    Status: "",
    Description: "",
    SubjectMatter: "",
    Details: "",
  });
  const [studentSection, setStudentSection] = useState([]);
  const [coachStatus, setCoachStatus] = useState([]);
  const [section, setSection] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [posts, setPosts] = useState([]);

  const [classStatus, setClassStatus] = useState([
    "On-Going",
    "No Class",
    "Absent",
    "Not Set",
  ]);

  const [dataChange] = useHandleChange(setData);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const changeSection = (e) => {
    e.preventDefault();
    data_post(
      "student-section-edit",
      {
        id: loggeduser.SCHLID,
        section: studentSection.Section,
        data: data.Section,
      },
      setData
    );
    // showToast(
    //   info.icons.others.info,
    //   "Course",
    //   `Course ${data[0].Course} is set to archive!`
    // );
  };

  const addSection = (e) => {
    e.preventDefault();
    data_post(
      "student-section-add",
      {
        id: loggeduser.SCHLID,
        section: data.Section,
      },
      setData
    );
    data_post(
      "student-section",
      { data: loggeduser.SCHLID },
      setStudentSection
    );
    // showToast(
    //   info.icons.others.info,
    //   "Course",
    //   `Course ${data[0].Course} is set to archive!`
    // );
  };

  const addStudentSection = (e) => {
    e.preventDefault();
    data_post(
      "student-section-register",
      {
        data: loggeduser.SCHLID,
      },
      setData
    );
  };

  const updateStatus = (e) => {
    e.preventDefault();
    data_post(
      "coach-status-update",
      {
        id: loggeduser.SCHLID,
        status: data.Status,
        description: data.Description,
      },
      setData
    );
    setTimeout(() => {
      data_post("coach-status", { data: loggeduser.SCHLID }, setCoachStatus);
    }, 500);
  };

  const posting = (e) => {
    e.preventDefault();
    data_post(
      "posts-insert",
      {
        Author: loggeduser.SCHLID,
        SubjectMatter: data.SubjectMatter,
        Details: data.Details,
        Date: `${
          days[daytoday.getDay()]
        }, ${daytoday.getDate()}/${daytoday.getMonth()}/${daytoday.getFullYear()}`,
        Time: `${
          daytoday.getHours() > 12
            ? daytoday.getHours() - 12
            : daytoday.getHours()
        }:${daytoday.getMinutes()} ${daytoday.getHours() >= 12 ? "PM" : "AM"}`,
      },
      setData
    );

    document.getElementById("SubjectMatter").value = "";
    document.getElementById("Details").value = "";
    setTimeout(() => {
      data_get("posts-list", setPosts);
    }, 500);
  };

  useEffect(() => {
    data_get("posts-list", setPosts);
    data_get("project-list", setSection);
    data_get("class-schedule-list", setSchedules);
    if (loggeduser.PermissionLevel === "0") {
      data_post(
        "student-section",
        { data: loggeduser.SCHLID },
        setStudentSection
      );
    }
    if (loggeduser.PermissionLevel === "1") {
      data_post("coach-status", { data: loggeduser.SCHLID }, setCoachStatus);
    }
  }, []);
  // studentSection, coachStatus, addSection
  useEffect(() => {
    data_post(
      "student-section",
      { data: loggeduser.SCHLID },
      setStudentSection
    );
  }, [addSection]);

  // useEffect(() => {
  //   data_post("coach-status", { data: loggeduser.SCHLID }, setCoachStatus);
  // }, [updateStatus]);

  useEffect(() => {
    setData((prev) => ({ ...prev, Status: coachStatus.ClassStatus }));
    setData((prev) => ({ ...prev, Description: coachStatus.Description }));
  }, [coachStatus]);

  return (
    <main className="h-100 overflow-y-auto">
      <main className="row h-100 m-0 p-0">
        <section className="col-3 h-100 p-2">
          <main className="h-100 p-3 shadow-sm rounded">
            <main className="h-25">
              <h5 className="m-0">{`${loggeduser.LastName}, ${loggeduser.FirstName}`}</h5>
              <p className="m-0">{`${loggeduser.SCHLID}`}</p>
              <p className="m-0">{`${loggeduser.Email}`}</p>
              <hr className="m-0 p-0 py-1" />
              {loggeduser.PermissionLevel === "0" ? (
                <main className="">
                  {studentSection.SCHLID !== undefined ? (
                    <main className="d-flex justify-content-between align-items-center">
                      <section className="w-100">
                        <DefaultButton
                          class="primary-gradient w-100 p-2"
                          reversed={false}
                          text={studentSection.Section}
                          icon={info.icons.forms.edit}
                          function={() =>
                            showModal(
                              "studentModal",
                              "What class are you in?",
                              <>
                                <span>Input your Section.</span>
                              </>
                            )
                          }
                          disabled={studentSection.ChangeAttempt}
                        />
                      </section>
                    </main>
                  ) : (
                    <DefaultButton
                      class="primary-gradient w-100 p-2"
                      text="Set Your Section"
                      reversed={false}
                      icon={info.icons.forms.add}
                      function={addStudentSection}
                    />
                  )}
                </main>
              ) : (
                <main>
                  <main className="d-flex justify-content-between align-items-center">
                    <section className="w-100">
                      <DefaultButton
                        class="primary-gradient w-100 p-2"
                        reversed={true}
                        text={coachStatus.ClassStatus}
                        icon={info.icons.forms.edit}
                        function={() =>
                          showModal(
                            "coachModal",
                            "Are you in Class ?",
                            <>
                              <span>
                                Input your Status and Description (optional).
                              </span>
                            </>
                          )
                        }
                      />
                      <p className="m-0 border p-1 mt-1 rounded text-center fst-italic text-truncate">
                        <small>{coachStatus.Description}</small>
                      </p>
                    </section>
                  </main>
                  <section></section>
                </main>
              )}
            </main>
            {loggeduser.PermissionLevel === "0" ? (
              <main className="h-75 overflow-y-auto">
                <main>
                  <h6 className="m-0 text-secondary fw-normal text-end px-1">
                    On-Going
                  </h6>
                  {schedules.map((schedule, i) =>
                    schedule.Section === studentSection.Section ? (
                      schedule.StartTime <
                        daytoday.getHours() * 60 + daytoday.getMinutes() &&
                      daytoday.getHours() * 60 + daytoday.getMinutes() <
                        schedule.EndTime ? (
                        schedule.Day === days[daytoday.getDay()] ? (
                          <main className="p-1">
                            <section className="p-3 shadow-sm rounded mb-2">
                              <h6 className="p-0 m-0">{schedule.Course}</h6>
                              <p className="p-0 m-0 text-secondary">
                                <span>{schedule.Section}</span>
                              </p>
                              <p className="p-0 m-0 text-secondary">
                                <span>{`${schedule.Day}, ${convertMinutes(
                                  schedule.StartTime
                                )} - ${convertMinutes(
                                  schedule.EndTime
                                )}`}</span>
                              </p>
                              <p className="p-0 m-0 text-secondary">
                                <span>{schedule.Room}</span>
                              </p>
                            </section>
                          </main>
                        ) : null
                      ) : null
                    ) : null
                  )}
                  <hr className="m-0 p-0 my-3"></hr>
                  <h6 className="m-0 text-secondary fw-normal text-end px-1">
                    Classes
                  </h6>
                  {schedules.length > 0
                    ? schedules.map((item, i) =>
                        item.Day === days[daytoday.getDay()] ? (
                          item.Section === studentSection.Section ? (
                            !(
                              item.StartTime <
                                daytoday.getHours() * 60 +
                                  daytoday.getMinutes() &&
                              daytoday.getHours() * 60 + daytoday.getMinutes() <
                                item.EndTime
                            ) ? (
                              <main className="p-1">
                                <section className="p-3 shadow-sm rounded mb-2">
                                  <h6 className="p-0 m-0">{item.Course}</h6>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{item.Section}</span>
                                  </p>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{`${item.Day}, ${convertMinutes(
                                      item.StartTime
                                    )} - ${convertMinutes(
                                      item.EndTime
                                    )}`}</span>
                                  </p>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{item.Room}</span>
                                  </p>
                                </section>
                              </main>
                            ) : null
                          ) : null
                        ) : null
                      )
                    : null}
                </main>
              </main>
            ) : (
              <main className="h-75 overflow-y-auto">
                <main>
                  <h6 className="m-0 text-secondary fw-normal mb-2 text-end px-1">
                    On-Going
                  </h6>
                  {schedules.map((schedule, i) =>
                    schedule.SCHLID === loggeduser.SCHLID ? (
                      schedule.StartTime <
                        daytoday.getHours() * 60 + daytoday.getMinutes() &&
                      daytoday.getHours() * 60 + daytoday.getMinutes() <
                        schedule.EndTime ? (
                        schedule.Day === days[daytoday.getDay()] ? (
                          <main className="p-1">
                            <section className="p-3 shadow-sm rounded mb-2">
                              <h6 className="p-0 m-0">{schedule.Course}</h6>
                              <p className="p-0 m-0 text-secondary">
                                <span>{schedule.Section}</span>
                              </p>
                              <p className="p-0 m-0 text-secondary">
                                <span>{`${schedule.Day}, ${convertMinutes(
                                  schedule.StartTime
                                )} - ${convertMinutes(
                                  schedule.EndTime
                                )}`}</span>
                              </p>
                              <p className="p-0 m-0 text-secondary">
                                <span>{schedule.Room}</span>
                              </p>
                            </section>
                          </main>
                        ) : null
                      ) : null
                    ) : null
                  )}
                  <hr className="m-0 p-0 my-3"></hr>
                  <h6 className="m-0 text-secondary fw-normal text-end px-1">
                    Classes
                  </h6>
                  {schedules.length > 0
                    ? schedules.map((item, i) =>
                        item.Day === days[daytoday.getDay()] ? (
                          item.SCHLID === loggeduser.SCHLID ? (
                            !(
                              item.StartTime <
                                daytoday.getHours() * 60 +
                                  daytoday.getMinutes() &&
                              daytoday.getHours() * 60 + daytoday.getMinutes() <
                                item.EndTime
                            ) ? (
                              <main className="p-1">
                                <section className="p-3 shadow-sm rounded mb-2">
                                  <h6 className="p-0 m-0">{item.Course}</h6>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{item.Section}</span>
                                  </p>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{`${item.Day}, ${convertMinutes(
                                      item.StartTime
                                    )} - ${convertMinutes(
                                      item.EndTime
                                    )}`}</span>
                                  </p>
                                  <p className="p-0 m-0 text-secondary">
                                    <span>{item.Room}</span>
                                  </p>
                                </section>
                              </main>
                            ) : null
                          ) : null
                        ) : null
                      )
                    : null}
                </main>
              </main>
            )}
          </main>
        </section>
        <section className="col-9 h-100 p-2">
          <main className="h-100 overflow-y-auto pe-2 ps-1">
            {loggeduser.PermissionLevel === "1" ? (
              <main className="bg-white shadow-sm rounded p-2 mb-2">
                <section className="d-flex gap-2 mb-2">
                  <input
                    id="SubjectMatter"
                    name="SubjectMatter"
                    className="w-100 form-control form-control-sm"
                    placeholder="Subject"
                    onChange={dataChange}
                  ></input>
                  <DefaultButton
                    class="px-2 py-0 border"
                    reversed={false}
                    text="Post"
                    icon={info.icons.navigation.quicknav}
                    function={() => {
                      data.SubjectMatter !== "" && data.Details !== ""
                        ? showModal(
                            "PostsModal",
                            "Post",
                            <main>
                              <header>
                                <p>Submit to Post your Announcements</p>
                              </header>
                            </main>
                          )
                        : alert("Required: Subject and Details");
                    }}
                  />
                </section>
                <section>
                  <textarea
                    id="Details"
                    name="Details"
                    rows="2"
                    className="w-100 form-control form-control-sm"
                    placeholder="Post Details"
                    onChange={dataChange}
                    style={{ whiteSpace: "pre-line" }}
                  ></textarea>
                </section>
              </main>
            ) : null}
            {posts.map((item, i) => (
              <main className="bg-white rounded shadow-sm p-5 mb-3">
                <header>
                  <small>
                    <h6 className="m-0">{`${item.LastName}, ${item.FirstName}`}</h6>
                    <p className="text-secondary">{item.Email}</p>
                  </small>
                </header>
                <main>
                  <section className="ms-3">
                    <h3 className="text-primary fw-bold">{item.SubjectMatter}</h3>
                    <pre>{item.Details}</pre>
                  </section>
                  <footer className="mt-5">
                    <hr />
                    <small>
                      <small>
                        <p className="m-0 text-secondary text-end">{`${item.Date} at ${item.Time}`}</p>
                      </small>
                    </small>
                  </footer>
                </main>
              </main>
            ))}
          </main>
        </section>
      </main>
      <PassiveModal
        id={"studentModal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <SelectButton
              label={null}
              id="Section"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected content={studentSection.Section} />
                  {section.map((option, i) =>
                    option.Section !== studentSection.Section ? (
                      <SelectButtonItem
                        value={option.Section}
                        content={option.Section}
                      />
                    ) : null
                  )}
                </>
              }
            />
          </>
        }
        trigger={() =>
          showModal(
            "StatusModal",
            "Are you sure?",
            <main>
              <header>
                <p>
                  By submitting, you cannot change your section until next Term
                </p>
              </header>
            </main>
          )
        }
      />
      <PassiveModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={modalcontent.Content}
        trigger={changeSection}
      />
      <PassiveModal
        id={"PostsModal"}
        title={modalcontent.Title}
        content={modalcontent.Content}
        trigger={posting}
      />
      <PassiveModal
        id={"coachModal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <SelectButton
              label={null}
              id="Status"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected content={coachStatus.ClassStatus} />
                  {classStatus.map((option, i) =>
                    option !== coachStatus.ClassStatus ? (
                      <SelectButtonItem value={option} content={option} />
                    ) : null
                  )}
                </>
              }
            />
            <DefaultInput
              class={"p-2 mb-3"}
              label={null}
              id="Description"
              trigger={dataChange}
              value={data.Description}
              required={true}
            />
          </>
        }
        trigger={updateStatus}
      />
    </main>
  );
}
