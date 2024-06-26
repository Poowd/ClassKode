import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { SelectButton } from "../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../hook/useHandleChange";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { SelectButtonItemSelected } from "../../../component/dropdown/select/SelectButtonItemSelected";

export function AcademicYear() {
  const [get, post] = useDatabase();

  const [data, setData] = useState({
    Department: "",
    Program: "",
  });
  const [aystate, setAYState] = useState("");
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [setup, setSetup] = useState([]);
  const [currentay, setCurrentAY] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("academicyear-current", currentay, setCurrentAY);
  }, [department, program]);

  useEffect(() => {
    setData((prev) => ({ ...prev, Program: "" }));
  }, [data.Department]);

  useEffect(() => {
    currentay.map((ay, i) => setCurrentAcademicYear(ay));
  }, [currentay]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100 p-2">
          <h6>{currentAcademicYear.AcademicYear}</h6>
        </main>
      }
      control={
        <>
          <div className="w-100 d-flex justify-content-between">
            <div className="d-flex gap-2 ">
              <DefaultButton
                class="btn-primary px-2"
                icon={<PiGearSixFill />}
                text="Coach"
                function={() => setAYState("Coach")}
              />
              <DefaultButton
                class="btn-primary px-2"
                icon={<PiGearSixFill />}
                text="Program"
                function={() => setAYState("Program")}
              />
            </div>
            <div className="d-flex gap-2 ">
              <DefaultButton
                class="btn-outline-primary"
                icon={<PiGearSixFill />}
              />
              <Link
                to={"/institution/curriculum/create/0"}
                state={{
                  academicyear: currentAcademicYear,
                  aystate: aystate,
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
        aystate === "Coach"
          ? "assignment"
          : aystate === "Program"
          ? "projection"
          : null
      }
    />
  );
}
