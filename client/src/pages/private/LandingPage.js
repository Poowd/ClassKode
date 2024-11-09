import React, { useEffect, useState } from "react";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import useHandleChange from "../../hook/useHandleChange";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import { MainSelect } from "../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../component/dropdown/select/SelectButtonItem";
import { MainInput } from "../../component/input/MainInput";
import useModal from "../../hook/useModal";
import { PassiveModal } from "../../component/modal/PassiveModal";
import { FormInput } from "../../component/input/FormInput";
import { SelectButton } from "../../component/dropdown/select/SelectButton";
import useTimeFormat from "../../hook/useTimeFormat";
import { RoomCard } from "../../component/card/RoomCard";

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
  });
  const [studentSection, setStudentSection] = useState([]);
  const [coachStatus, setCoachStatus] = useState([]);
  const [section, setSection] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [classStatus, setClassStatus] = useState([
    "ONCLASS",
    "NOTINCLASS",
    "OFFHOURS",
    "ABSENT",
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
    data_post("coach-status", { data: loggeduser.SCHLID }, setCoachStatus);
    // showToast(
    //   info.icons.others.info,
    //   "Course",
    //   `Course ${data[0].Course} is set to archive!`
    // );
  };

  useEffect(() => {
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
                    <main className="p-2 d-flex justify-content-between align-items-center bg-white rounded shadow-sm">
                      <section>
                        <h6 className="m-0">{studentSection.Section}</h6>
                      </section>
                      <section className="d-flex gap-1">
                        <DefaultButton
                          class="btn-primary"
                          reversed={true}
                          icon={info.icons.forms.edit}
                          function={() =>
                            showModal(
                              "studentModal",
                              "What is your Section ?",
                              <>
                                <span>Input your Section.</span>
                              </>
                            )
                          }
                        />
                      </section>
                    </main>
                  ) : (
                    <DefaultButton
                      class="btn-primary w-100"
                      reversed={true}
                      icon={info.icons.forms.add}
                      function={addStudentSection}
                    />
                  )}
                </main>
              ) : (
                <main>
                  <main className="d-flex justify-content-between align-items-center">
                    <section>
                      <h6 className="m-0">{coachStatus.ClassStatus}</h6>
                    </section>
                    <section className="d-flex gap-1">
                      <DefaultButton
                        class="btn-primary"
                        reversed={true}
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
                    </section>
                  </main>
                  <section>
                    <p className="m-0">{coachStatus.Description}</p>
                  </section>
                </main>
              )}
            </main>
            {loggeduser.PermissionLevel === "0" ? (
              <main className="h-75 overflow-y-auto">
                <main>
                  <h6 className="m-0 text-secondary fw-normal">On-Going</h6>
                  {schedules.map((schedule, i) =>
                    schedule.Section === studentSection.Section ? (
                      schedule.StartTime <
                        daytoday.getHours() * 60 + daytoday.getMinutes() &&
                      daytoday.getHours() * 60 + daytoday.getMinutes() <
                        schedule.EndTime ? (
                        schedule.Day === days[daytoday.getDay()] ? (
                          <RoomCard
                            key={i}
                            section={schedule.Room}
                            course={schedule.Course}
                            time={`${schedule.Day} - ${convertMinutes(
                              schedule.StartTime
                            )} - ${convertMinutes(schedule.EndTime)}`}
                          />
                        ) : null
                      ) : null
                    ) : null
                  )}
                  <hr className="m-0 p-0 my-2"></hr>
                  <h6 className="m-0 text-secondary fw-normal">This Day!</h6>
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
                              <>
                                <RoomCard
                                  key={i}
                                  section={item.Room}
                                  course={item.Course}
                                  time={`${item.Day} - ${convertMinutes(
                                    item.StartTime
                                  )} - ${convertMinutes(item.EndTime)}`}
                                />
                              </>
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
                  <h6 className="m-0 text-secondary fw-normal">On-Going</h6>
                  {schedules.map((schedule, i) =>
                    schedule.Coach === loggeduser.SCHLID ? (
                      schedule.StartTime <
                        daytoday.getHours() * 60 + daytoday.getMinutes() &&
                      daytoday.getHours() * 60 + daytoday.getMinutes() <
                        schedule.EndTime ? (
                        schedule.Day === days[daytoday.getDay()] ? (
                          <RoomCard
                            key={i}
                            section={schedule.Room}
                            course={schedule.Course}
                            time={`${schedule.Day} - ${convertMinutes(
                              schedule.StartTime
                            )} - ${convertMinutes(schedule.EndTime)}`}
                          />
                        ) : null
                      ) : null
                    ) : null
                  )}
                  <hr className="m-0 p-0 my-2"></hr>
                  <h6 className="m-0 text-secondary fw-normal">This Day!</h6>
                  {schedules.length > 0
                    ? schedules.map((item, i) =>
                        item.Day === days[daytoday.getDay()] ? (
                          item.Section === loggeduser.SCHLID ? (
                            !(
                              item.StartTime <
                                daytoday.getHours() * 60 +
                                  daytoday.getMinutes() &&
                              daytoday.getHours() * 60 + daytoday.getMinutes() <
                                item.EndTime
                            ) ? (
                              <>
                                <RoomCard
                                  key={i}
                                  section={item.Room}
                                  course={item.Course}
                                  time={`${item.Day} - ${convertMinutes(
                                    item.StartTime
                                  )} - ${convertMinutes(item.EndTime)}`}
                                />
                              </>
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
          <main className="h-100 overflow-y-auto">
            <main className="d-flex">
              <textarea
                id="Input"
                name="Input"
                rows="2"
                className="w-100 form-control"
                placeholder="Quick Navigation"
                onChange={dataChange}
              ></textarea>
              <DefaultButton
                class=""
                reversed={true}
                icon={info.icons.navigation.quicknav}
                function={() => {}}
              />
            </main>
            pwede mag post si coach ng announcement consultation hours ni coach
            class nya dito makikita ung mga announcements
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
        trigger={changeSection}
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
