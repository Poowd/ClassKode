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

export function Curriculum() {
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

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("curriculum-current", currentcrr, setCurrentCRR);
  }, [department, program]);

  useEffect(() => {
    setData((prev) => ({ ...prev, Program: "" }));
  }, [data.Department]);

  useEffect(() => {
    currentcrr.map((crr, i) => setCurrentCurriculum(crr));
  }, [currentcrr]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100 p-2">
          <h6>{currentCurriculum.Curriculum}</h6>
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
              <DefaultButton
                class="btn-outline-primary"
                icon={<PiGearSixFill />}
              />
              <Link
                to={"/institution/curriculum/create/0"}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: currentcrr.map((crr, i) => crr.Curriculum),
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
            <main className="w-100 bg-white rounded shadow-sm p-3 mb-2 row m-0">
              <section className="col-2 p-0 m-0">
                <h6 className="p-0 m-0">{item.Component}</h6>
              </section>
              <section className="col-6 p-0 m-0">
                <h6 className="p-0 m-0">{item.Course}</h6>
                <small>
                  <p className="p-0 m-0 text-secondary fst-italic">
                    <span>{item.STP_Created}</span>
                  </p>
                </small>
              </section>
              <section className="col-3 p-0 m-0">
                <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
                  <p className="p-0 m-0">{item.Curriculum}</p>
                  <small>
                    <p className="p-0 m-0 text-secondary fst-italic">
                      <span>{item.Program}</span>
                    </p>
                  </small>
                </div>
              </section>
              <section className="col-1 p-0 m-0">
                <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
                  <Link
                    to={"/institution/curriculum/view/" + item.STPID}
                    state={{ data: item }}
                  >
                    <DefaultButton class="btn-primary" icon={<GrView />} />
                  </Link>
                </div>
              </section>
            </main>
          ) : null
        ) : null
      )}
    />
  );
}
