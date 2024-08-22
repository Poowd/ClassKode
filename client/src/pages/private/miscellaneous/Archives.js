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

  useEffect(() => {
    post("arch-dept", department, setDepartment);
    post("arch-prg", program, setProgram);
    post("arch-crs", course, setCourse);
    post("arch-coach", coach, setCoach);
    post("arch-sect", section, setSection);
    post("arch-rom", room, setRoom);
    post("arch-acy", academicyear, setAcademicYear);
    post("arch-curr", curriculum, setCurriculum);
    post("arch-sched", schedule, setSchedule);
  }, [
    department,
    program,
    course,
    coach,
    section,
    room,
    academicyear,
    curriculum,
    schedule,
  ]);

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
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
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
                    <DefaultDropdownItem
                      title={"Department"}
                      trigger={() => setSelection("Department")}
                    />
                    <DefaultDropdownItem
                      title={"Program"}
                      trigger={() => setSelection("Program")}
                    />
                    <DefaultDropdownItem
                      title={"Course"}
                      trigger={() => setSelection("Course")}
                    />
                    <DefaultDropdownItem
                      title={"Coach"}
                      trigger={() => setSelection("Coach")}
                    />
                    <DefaultDropdownItem
                      title={"Section"}
                      trigger={() => setSelection("Section")}
                    />
                    <DefaultDropdownItem
                      title={"Room"}
                      trigger={() => setSelection("Room")}
                    />
                  </section>
                  <section className="p-3">
                    <h6>Utilities</h6>
                    <DefaultDropdownItem
                      title={"Curriculum"}
                      trigger={() => setSelection("Curriculum")}
                    />
                    <DefaultDropdownItem
                      title={"Academic Year"}
                      trigger={() => setSelection("Academic Year")}
                    />
                    <DefaultDropdownItem
                      title={"Schedules"}
                      trigger={() => setSelection("Schedules")}
                    />
                  </section>
                </main>
              </>
            }
          />
        </>
      }
      list={
        selection === "Department"
          ? department.map((dept, i) => (
              <ListCard
                slot1={dept.DPT_Code}
                slot2={dept.Department}
                slot3={dept.DPT_Created}
                slot4={dept.DPT_Abbreviation}
                slot5={dept.DPT_Abbreviation}
                link={null}
                state={null}
                custom={
                  <DefaultButton
                    class="btn-warning"
                    icon={info.icons.restore}
                    function={() => {
                      post("res-dept", { DPTID: dept.DPTID }, setData);
                    }}
                  />
                }
              />
            ))
          : selection === "Program"
          ? program.map((prog, i) => (
              <ListCard
                slot1={prog.PRG_Code}
                slot2={prog.Program}
                slot3={prog.PRG_Created}
                slot4={"Available"}
                slot5={"2024-2025"}
                link={null}
                state={null}
                custom={
                  <DefaultButton
                    class="btn-warning"
                    icon={info.icons.restore}
                    function={() => {
                      post("res-prg", { PRGID: prog.PRGID }, setData);
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
                slot3={coach.CCH_Created}
                slot4={coach.Department}
                slot5={coach.Email}
                link={null}
                state={null}
                custom={
                  <DefaultButton
                    class="btn-warning"
                    icon={info.icons.restore}
                    function={() => {
                      post("res-coach", { CCHID: coach.CCHID }, setData);
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
                    }}
                  />
                }
              />
            ))
          : null
      }
    />
  );
}
