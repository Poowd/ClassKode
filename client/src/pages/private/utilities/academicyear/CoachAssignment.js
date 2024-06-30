import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../hook/useHandleChange";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { ViewCard } from "../../../../component/card/ViewCard";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";

export function CoachAssignment() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState({
    Department: "",
    Program: "",
  });
  const [aystate, setAYState] = useState("Coach");
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [setup, setSetup] = useState([]);
  const [currentay, setCurrentAY] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [projection, setProjection] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("academicyear-current", currentay, setCurrentAY);
    post("assignment", assignment, setAssignment);
    post("projection", projection, setProjection);
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, Program: "" }));
  }, [data.Department]);

  useEffect(() => {
    currentay.map((ay, i) => setCurrentAcademicYear(ay));
  }, [currentay]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100">
          <header className="d-flex justify-content-end align-items-center border-bottom pb-2 gap-2">
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={
                "/institution/academic-year/view/" + currentAcademicYear.ACYID
              }
              state={{ data: currentAcademicYear }}
              icon={<GrView />}
            />
          </header>
          <main className="mt-2">
            <p className="p-0 m-0 fw-semibold text-secondary">Academic Year</p>
            <h5>{currentAcademicYear.AcademicYear}</h5>
          </main>
        </main>
      }
      control={
        <>
          <div className="w-100">
            <div className="d-flex gap-2 justify-content-end">
              <DefaultButton
                class="btn-outline-primary"
                icon={<PiGearSixFill />}
                function={() => navigate(-1)}
              />
              <DefaultInput placeholder="Search" />
              <DefaultButton
                class="btn-outline-primary"
                icon={<PiGearSixFill />}
              />
              <Link
                to={"/institution/assignment/create/0"}
                state={{
                  academicyear: currentAcademicYear,
                }}
              >
                <DefaultButton
                  class="btn-primary"
                  icon={<RiStickyNoteAddLine />}
                />
              </Link>
            </div>
          </div>
        </>
      }
      list={
        assignment.length > 0
          ? assignment.map((item, i) =>
              item.ACY_Code === currentAcademicYear.ACY_Code ? (
                <ListCard
                  slot1={item.CoachType}
                  slot2={
                    <>
                      {item.FirstName + " "}
                      {item.MiddleInitial !== (null || "")
                        ? " " + item.MiddleInitial + ". "
                        : " "}
                      {item.LastName + " "}
                    </>
                  }
                  slot3={item.ASG_Created}
                  slot4={item.ACY_Code}
                  slot5={
                    <>
                      {item.MinUnits} {" - "} {item.MaxUnits} {" units"}
                    </>
                  }
                  link={"/institution/assignment/view/" + item.ASGID}
                  state={"a"}
                />
              ) : null
            )
          : null
      }
    />
  );
}
