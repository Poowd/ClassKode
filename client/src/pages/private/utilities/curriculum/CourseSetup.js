import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import useHandleChange from "../../../../hook/useHandleChange";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { ListCard } from "../../../../component/card/ListCard";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiLayer } from "react-icons/bi";
import { RiMindMap } from "react-icons/ri";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";

export function CourseSetup() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();

  const [data, setData] = useState({
    Curriculum: "",
    Department: "",
    Program: "",
  });
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [setup, setSetup] = useState([]);
  const [currentcrr, setCurrentCRR] = useState([]);
  const [currentCurriculum, setCurrentCurriculum] = useState([]);

  const [dataChange] = useHandleChange(setData);

  const xxx = [JSON.parse(localStorage.getItem("data"))];

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("curriculum-current", currentcrr, setCurrentCRR);
  }, []);

  useEffect(() => {
    if (data.Department !== xxx[0].Department) {
      setData((prev) => ({ ...prev, Program: "" }));
    }
  }, [data]);

  useEffect(() => {
    if (
      data.Curriculum === "" &&
      data.Department === "" &&
      data.Program === ""
    ) {
    } else {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (
      xxx[0].Curriculum === "" &&
      xxx[0].Department === "" &&
      xxx[0].Program === ""
    ) {
    } else {
      setData(xxx[0]);
    }
  }, []);

  useEffect(() => {
    currentcrr.map((crr, i) => setCurrentCurriculum(crr));
  }, [currentcrr]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100">
          <header className="d-flex justify-content-end align-items-center border-bottom pb-2 gap-2">
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={"/institution/curriculum/view/" + currentCurriculum.CRRID}
              state={{
                data: currentCurriculum,
              }}
              icon={<GrView />}
            />
          </header>
          <main className="mt-2">
            <p className="p-0 m-0 fw-semibold text-secondary">Curriculum</p>
            <h5>{currentCurriculum.Curriculum}</h5>
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

              <DefaultDropdown
                class="border px-2 btn-primary"
                reversed={true}
                icon={<BiLayer />}
                text={
                  data.Department !== ""
                    ? department.map((item, i) =>
                        item.DPT_Code === data.Department
                          ? item.DPT_Abbreviation
                          : null
                      )
                    : "Department"
                }
                dropdownitems={
                  <>
                    {department.map((option, i) =>
                      option.DPT_Code !== data.Department ? (
                        <DefaultDropdownItem
                          title={option.Department}
                          trigger={() =>
                            setData((prev) => ({
                              ...prev,
                              Department: option.DPT_Code,
                            }))
                          }
                        />
                      ) : null
                    )}
                  </>
                }
              />
              <DefaultDropdown
                class="border px-2 btn-primary"
                reversed={true}
                icon={<BiLayer />}
                text={
                  data.Program !== ""
                    ? program.map((item, i) =>
                        item.PRG_Code === data.Program
                          ? item.PRG_Abbreviation
                          : null
                      )
                    : "Program"
                }
                dropdownitems={
                  <>
                    {program.map((option, i) =>
                      option.DPT_Code === data.Department &&
                      option.PRG_Code !== data.Program ? (
                        <DefaultDropdownItem
                          title={option.Program}
                          trigger={() =>
                            setData((prev) => ({
                              ...prev,
                              Program: option.PRG_Code,
                            }))
                          }
                        />
                      ) : null
                    )}
                  </>
                }
              />
              <Link
                to={data.Program !== "" ? "/institution/setup/create/0" : ""}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: currentCurriculum,
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
        data.Program !== ""
          ? setup.map((item, i) =>
              item.PRG_Code === data.Program ? (
                item.CRR_Code === currentCurriculum.CRR_Code ? (
                  <ListCard
                    slot1={item.Component}
                    slot2={item.Course}
                    slot3={item.STP_Created}
                    slot4={item.Curriculum}
                    slot5={item.Program}
                    link={"/institution/setup/view/" + item.STPID}
                    state={{ data: item }}
                  />
                ) : null
              ) : null
            )
          : <p className="fw-semibold text-center p-3 text-secondary">= Select Department & Program =</p>
      }
    />
  );
}
