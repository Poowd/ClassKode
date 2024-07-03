import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import useHandleChange from "../../../hook/useHandleChange";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { ListCard } from "../../../component/card/ListCard";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import { LuUsers2 } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { MdArrowBackIosNew } from "react-icons/md";

export function AcademicYear() {
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
  const [academicyear, setAcademicYear] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("academicyear-current", currentay, setCurrentAY);
    post("academicyear", academicyear, setAcademicYear);
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
                class=""
                icon={<MdArrowBackIosNew />}
                function={() => navigate(-1)}
              />
              <DefaultInput placeholder="Search" />
              <LinkButton
                class="btn-primary px-2"
                textclass="text-white"
                to={"/institution/academic-year/create/0"}
                state={{
                  academicyear: currentAcademicYear,
                  aystate: aystate,
                }}
                icon={<RiStickyNoteAddLine />}
              />
            </div>
          </div>
        </>
      }
      list={
        academicyear.length > 0
          ? academicyear.map((item, i) => (
              <ListCard
                slot1={item.ACY_Code}
                slot2={item.AcademicYear}
                slot3={item.ACY_Created}
                slot4={item.CRR_Code}
                slot5={
                  <>
                    {item.StartDate}
                    {" - "}
                    {item.EndDate}
                  </>
                }
                link={null}
                state={null}
                custom={
                  item.ACY_Code === currentAcademicYear.ACY_Code ? (
                    <>
                      <DefaultButton
                        class="btn-info px-2"
                        icon={<LuUser2 />}
                        function={() =>
                          navigate("/utilities/academicyear/assigment")
                        }
                      />
                      <DefaultButton
                        class="btn-info px-2"
                        icon={<LuUsers2 />}
                        function={() =>
                          navigate("/utilities/academicyear/projection")
                        }
                      />
                    </>
                  ) : null
                }
              />
            ))
          : null
      }
    />
  );
}
