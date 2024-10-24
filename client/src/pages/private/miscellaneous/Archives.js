import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa6";
import useDatabase from "../../../hook/useDatabase";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { useToasty } from "../../../hook/useToasty";
import { DefaultToast } from "../../../component/toast/DefaultToast";

export function Archives() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const LocalStorage = [JSON.parse(localStorage.getItem("archive_selection"))];

  const [selection, setSelection] = useState("");
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [course, setCourse] = useState([]);
  const [coach, setCoach] = useState([]);
  const [section, setSection] = useState([]);
  const [room, setRoom] = useState([]);
  const [academicyear, setAcademicYear] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState([]);
  const [toasty, showToast] = useToasty();

  const [category, setCategory] = useState({
    institution: [
      "Department",
      "Program",
      "Course",
      "Coach",
      "Section",
      "Room",
    ],
    utilities: ["Curriculum", "Academic Year", "Schedules"],
  });

  useEffect(() => {
    data_get("department-list-archived", setDepartment);
    data_get("program-list-archived", setProgram);
    data_get("course-list-archived", setCourse);
    data_get("coach-list-archived", setCoach);
    data_get("section-list-archived", setSection);
    data_get("room-list-archived", setRoom);
    data_get("academic-year-list-archived", setAcademicYear);
    data_get("curriculum-list-archived", setCurriculum);
    data_get("schedules-list-archived", setSchedule);
  }, [department]);

  useEffect(() => {
    // if (selection !== LocalStorage[0].selection) {
    //   setSelection((prev) => ({ ...prev, Program: "" }));
    // }
    if (selection === "") {
    } else {
      localStorage.setItem("archive_selection", JSON.stringify(selection));
    }
  }, [selection]);

  useEffect(() => {
    if (LocalStorage[0] === null) {
    } else {
      setSelection(LocalStorage[0]);
    }
  }, []);

  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={
          <>
            <main className="p-2">
              <section>
                <header className="">
                  <h5 className="p-0 m-0">{`Sheet Details`}</h5>
                </header>
                <main className="mt-2">
                  <small>
                    <p className="fw-semibold p-0 m-0">Pages</p>
                  </small>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Department`}</section>
                        <section>{`${department.length}`}</section>
                      </main>
                    </li>
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Program`}</section>
                        <section>{`${program.length}`}</section>
                      </main>
                    </li>
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Course`}</section>
                        <section>{`${course.length}`}</section>
                      </main>
                    </li>
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Coach`}</section>
                        <section>{`${coach.length}`}</section>
                      </main>
                    </li>
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Section`}</section>
                        <section>{`${section.length}`}</section>
                      </main>
                    </li>
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>{`Room`}</section>
                        <section>{`${room.length}`}</section>
                      </main>
                    </li>
                  </ul>
                </main>
              </section>
            </main>
          </>
        }
        control={
          <>
            <DefaultButton
              class="px-2"
              icon={info.icons.navigation.back}
              text="Back"
              function={() => navigate(-1)}
            />
            <DefaultInput placeholder="Search" />
            <DefaultDropdown
              class="border px-2 btn-primary"
              reversed={true}
              icon={info.icons.forms.filter}
              text={selection}
              dropdownitems={
                <>
                  <main className="p-2 d-flex">
                    <section className="p-3">
                      <h6>Institution</h6>
                      {category.institution.map((item, i) => (
                        <DefaultDropdownItem
                          title={item}
                          trigger={() => setSelection(item)}
                        />
                      ))}
                    </section>
                    <section className="p-3">
                      <h6>Utilities</h6>
                      {category.utilities.map((item, i) => (
                        <DefaultDropdownItem
                          title={item}
                          trigger={() => setSelection(item)}
                        />
                      ))}
                    </section>
                  </main>
                </>
              }
            />
          </>
        }
        list={
          selection === "Department"
            ? department.map((department, i) => (
                <ListCard
                  slot1={department.Code}
                  slot2={department.Department}
                  slot3={department.Abbrev}
                  slot4={null}
                  slot5={department.AcademicLevel}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post(
                          "department-restore",
                          { data: department.DPTID },
                          setData
                        );
                        showToast(
                          info.icons.others.info,
                          "Department",
                          `Department ${department.Department} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Program"
            ? program.map((program, i) => (
                <ListCard
                  slot1={program.Code}
                  slot2={program.Program}
                  slot3={program.Abbrev}
                  slot4={null}
                  slot5={null}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post(
                          "program/restore",
                          { data: program.PRGID },
                          setData
                        );
                        showToast(
                          info.icons.others.info,
                          "Program",
                          `Program ${program.Program} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Course"
            ? course.map((course, i) => (
                <ListCard
                  slot1={course.Code}
                  slot2={course.Course}
                  slot3={course.Department}
                  slot4={null}
                  slot5={course.Status}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post("res-crs", { CRSID: course.CRSID }, setData);
                        showToast(
                          info.icons.others.info,
                          "Course",
                          `Course ${course.Course} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Coach"
            ? coach.map((coach, i) => (
                <ListCard
                  slot1={coach.SCHLID}
                  slot2={`${coach.FirstName} ${
                    coach.MiddleInitial !== (null || "")
                      ? " " + coach.MiddleInitial + ". "
                      : " "
                  } ${coach.LastName}`}
                  slot3={coach.Email}
                  slot4={coach.Department}
                  slot5={null}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post(
                          "coach/restore",
                          { data: coach.CCHID },
                          setData
                        );
                        showToast(
                          info.icons.others.info,
                          "Coach",
                          `Coach ${coach.FirstName} ${
                            coach.MiddleInitial !== null
                              ? " " + coach.MiddleInitial + ". "
                              : " "
                          } ${coach.LastName} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Section"
            ? section.map((section, i) => (
                <ListCard
                  slot1={section.SCTID}
                  slot2={section.Section}
                  slot3={section.Program}
                  slot4={section.YearLevel}
                  slot5={section.Semester}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post(
                          "res-sect",
                          { SCTID: section.SCTID },
                          setData
                        );
                        showToast(
                          info.icons.others.info,
                          "Section",
                          `Section ${section.Section} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Room"
            ? room.map((room, i) => (
                <ListCard
                  slot1={room.ROMID}
                  slot2={room.Room}
                  slot3={`${room.Building} - ${room.Floor}`}
                  slot4={room.Facility}
                  slot5={null}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post("res-rom", { ROMID: room.ROMID }, setData);
                        showToast(
                          info.icons.others.info,
                          "Room",
                          `Room ${room.Room} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Curriculum"
            ? curriculum.map((crr, i) => (
                <ListCard
                  slot1={crr.CRR_Code}
                  slot2={crr.Curriculum}
                  slot3={crr.CRR_Created}
                  slot4={null}
                  slot5={null}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post("res-curr", { CRRID: crr.CRRID }, setData);
                        showToast(
                          info.icons.others.info,
                          "Curriculum",
                          `Curriculum ${crr.Curriculum} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Academic Year"
            ? academicyear.map((acy, i) => (
                <ListCard
                  slot1={acy.ACY_Code}
                  slot2={acy.AcademicYear}
                  slot3={acy.ACY_Created}
                  slot4={acy.CRR_Code}
                  slot5={`${acy.StartDate} - ${acy.EndDate}`}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post("res-acy", { ACYID: acy.ACYID }, setData);
                        showToast(
                          info.icons.others.info,
                          "AcademicYear",
                          `AcademicYear ${acy.AcademicYear} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Schedules"
            ? schedule.map((sched, i) => (
                <ListCard
                  slot1={sched.Section}
                  slot2={sched.Course}
                  slot3={sched.SCD_Created}
                  slot4={`${sched.Room} ( ${sched.LastName} )`}
                  slot5={`${sched.StartTime} - ${sched.EndTime}`}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.forms.restore}
                      function={() => {
                        data_post("res-sched", { SCDID: sched.SCDID }, setData);
                        showToast(
                          info.icons.others.info,
                          "Schedules",
                          `Schedules ${sched.Schedules} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : null
        }
      />

      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </>
  );
}
