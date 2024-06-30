import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../hook/useHandleChange";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useLocation } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { ListCard } from "../../../../component/card/ListCard";

export function CourseSetup() {
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
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={"/institution/curriculum/create/0"}
              state={{
                curriculum: currentCurriculum,
              }}
              icon={<RiStickyNoteAddLine />}
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
            <div className="w-100 d-flex gap-2">
              <SelectButton
                id="Department"
                label="Department"
                width="w-100"
                class="form-select-sm"
                trigger={dataChange}
                option={
                  <>
                    <SelectButtonItemSelected
                      content={department.map((option, i) => (
                        <>
                          {option.DPT_Code === data.Department
                            ? option.Department
                            : ""}
                        </>
                      ))}
                    />
                    {department.map((option, i) =>
                      option.DPT_Code !== data.Department ? (
                        <SelectButtonItem
                          value={option.DPT_Code}
                          content={option.Department}
                        />
                      ) : null
                    )}
                  </>
                }
              />
              <SelectButton
                id="Program"
                label="Program"
                width="w-100"
                class="form-select-sm"
                trigger={dataChange}
                option={
                  <>
                    <SelectButtonItemSelected
                      content={program.map((option, i) => (
                        <>
                          {option.PRG_Code === data.Program
                            ? option.Program
                            : ""}
                        </>
                      ))}
                    />
                    {program.map((option, i) =>
                      option.DPT_Code === data.Department &&
                      option.PRG_Code !== data.Program ? (
                        <SelectButtonItem
                          value={option.PRG_Code}
                          content={option.Program}
                        />
                      ) : null
                    )}
                  </>
                }
              />
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <DefaultInput placeholder="Search" />
              <DefaultButton
                class="btn-outline-primary"
                icon={<PiGearSixFill />}
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
      list={setup.map((item, i) =>
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
      )}
    />
  );
}
