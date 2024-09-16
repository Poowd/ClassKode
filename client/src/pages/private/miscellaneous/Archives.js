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
  const [get, post] = useDatabase();
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
    get("department/list-archived", setDepartment);
    get("program/list-archived", setProgram);
    post("arch-crs", course, setCourse);
    get("coach/list-archived", setCoach);
    post("arch-sect", section, setSection);
    post("arch-rom", room, setRoom);
    post("arch-acy", academicyear, setAcademicYear);
    post("arch-curr", curriculum, setCurriculum);
    post("arch-sched", schedule, setSchedule);
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
            <main>
              <section>
                <header className="">
                  <h5 className="p-0 m-0">{`Sheet Details`}</h5>
                  <p>{``}</p>
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
                  </ul>
                </main>
              </section>
            </main>
          </>
        }
        control={
          <>
            <DefaultButton
              class=""
              icon={<MdArrowBackIosNew />}
              function={() => navigate(-1)}
            />
            <DefaultInput placeholder="Search" />
            <DefaultDropdown
              class="border px-2 btn-primary"
              reversed={true}
              icon={<FaFilter />}
              text={selection}
              dropdownitems={
                <>
                  <main className="p-3 d-flex">
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
                  slot3={department.Created}
                  slot4={department.Abbrev}
                  slot5={department.Status}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post(
                          "department/restore",
                          { data: department.DPTID },
                          setData
                        );
                        showToast(
                          info.icons.calendar,
                          "Department",
                          `Department ${department.Department} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Program"
            ? program.map((prog, i) => (
                <ListCard
                  slot1={prog.Code}
                  slot2={prog.Program}
                  slot3={prog.Created}
                  slot4={prog.Abbrev}
                  slot5={prog.Status}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post("program/restore", { data: prog.PRGID }, setData);
                        showToast(
                          info.icons.calendar,
                          "Program",
                          `Program ${prog.Program} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Course"
            ? course.map((cors, i) => (
                <ListCard
                  slot1={cors.CRS_Code}
                  slot2={cors.Course}
                  slot3={cors.CRS_Created}
                  slot4={cors.Program}
                  slot5={cors.AcademicLevel}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post("res-crs", { CRSID: cors.CRSID }, setData);
                        showToast(
                          info.icons.calendar,
                          "Course",
                          `Course ${cors.Course} is set to active!`
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
                    coach.MiddleInitial !== null
                      ? " " + coach.MiddleInitial + ". "
                      : " "
                  } ${coach.LastName}`}
                  slot3={coach.Created}
                  slot4={coach.Department}
                  slot5={coach.Email}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post("coach/restore", { data: coach.CCHID }, setData);
                        showToast(
                          info.icons.calendar,
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
            ? section.map((sect, i) => (
                <ListCard
                  slot1={sect.SCTID}
                  slot2={sect.Section}
                  slot3={sect.SCT_Created}
                  slot4={sect.AcademicLevel}
                  slot5={`${sect.YearLevel} - ${sect.Semester}`}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post("res-sect", { SCTID: sect.SCTID }, setData);
                        showToast(
                          info.icons.calendar,
                          "Section",
                          `Section ${sect.Section} is set to active!`
                        );
                      }}
                    />
                  }
                />
              ))
            : selection === "Room"
            ? room.map((rom, i) => (
                <ListCard
                  slot1={rom.ROMID}
                  slot2={rom.Room}
                  slot3={rom.ROM_Created}
                  slot4={rom.Facility}
                  slot5={`${rom.Building} - ${rom.Floor}`}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="btn-warning"
                      icon={info.icons.restore}
                      function={() => {
                        post("res-rom", { ROMID: rom.ROMID }, setData);
                        showToast(
                          info.icons.calendar,
                          "Room",
                          `Room ${rom.Room} is set to active!`
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
                      icon={info.icons.restore}
                      function={() => {
                        post("res-curr", { CRRID: crr.CRRID }, setData);
                        showToast(
                          info.icons.calendar,
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
                      icon={info.icons.restore}
                      function={() => {
                        post("res-acy", { ACYID: acy.ACYID }, setData);
                        showToast(
                          info.icons.calendar,
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
                      icon={info.icons.restore}
                      function={() => {
                        post("res-sched", { SCDID: sched.SCDID }, setData);
                        showToast(
                          info.icons.calendar,
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
