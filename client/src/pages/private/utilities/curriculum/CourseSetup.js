import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";
import useConfiguration from "../../../../hook/useConfiguration";

export function CourseSetup() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();

  const LocalStorage = [
    JSON.parse(localStorage.getItem("department_program_selection")),
  ];

  const [curr, setCurr] = useState([]);
  const [curcurr, setCurCurr] = useState([]);
  const [current, setCurrent] = useState([]);
  const [dept, setDept] = useState([]);
  const [prg, setPrg] = useState([]);
  const [setup, setSetup] = useState([]);
  const [data, setData] = useState({
    Curriculum: "",
    Department: "",
    Program: "",
  });

  useEffect(() => {
    post("sel-curr", curr, setCurr);
    post("sel-cur-curr", curcurr, setCurCurr);
    post("sel-dept", dept, setDept);
    post("sel-prg", prg, setPrg);
    post("sel-setup", setup, setSetup);
  }, [curr, curcurr, dept, prg, setup]);

  useEffect(() => {
    curcurr.map((curr, i) => setCurrent(curr));
  }, [curcurr]);

  useEffect(() => {
    // if (LocalStorage[0].Department !== null) {
    //   if (data.Department !== LocalStorage[0].Department) {
    //     setData((prev) => ({ ...prev, Program: "" }));
    //   }
    // }
    if (
      data.Curriculum === "" &&
      data.Department === "" &&
      data.Program === ""
    ) {
    } else {
      localStorage.setItem(
        "department_program_selection",
        JSON.stringify(data)
      );
    }
  }, [data]);

  useEffect(() => {
    if (LocalStorage[0] === null) {
    } else {
      setData(LocalStorage[0]);
    }
  }, []);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100">
          <header className="d-flex justify-content-end align-items-center border-bottom pb-2 gap-2">
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={`/curriculum/view/${current.CRRID}`}
              state={{
                data: current,
              }}
              icon={info.icons.view}
            />
          </header>
          <main className="mt-2">
            <p className="p-0 m-0 fw-semibold text-secondary">Curriculum</p>
            <h5>{current.Curriculum}</h5>
          </main>
        </main>
      }
      control={
        <>
          <div className="w-100">
            <div className="d-flex gap-2 justify-content-end">
              <DefaultButton
                class=""
                icon={info.icons.back}
                function={() => navigate(-1)}
              />
              <DefaultInput placeholder="Search" />
              <DefaultDropdown
                class="border px-2 btn-primary"
                reversed={true}
                icon={info.icons.view}
                text={
                  data.Department !== ""
                    ? dept.map((item, i) =>
                        item.DPT_Code === data.Department
                          ? item.DPT_Abbreviation
                          : null
                      )
                    : "Department"
                }
                dropdownitems={dept.map((option, i) =>
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
              />
              <DefaultDropdown
                class="border px-2 btn-primary"
                reversed={true}
                icon={info.icons.view}
                text={
                  data.Program !== ""
                    ? prg.map((item, i) =>
                        item.PRG_Code === data.Program
                          ? item.PRG_Abbreviation
                          : null
                      )
                    : "Program"
                }
                dropdownitems={prg.map((option, i) =>
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
              />
              <LinkButton
                class="btn-primary px-2"
                textclass="text-white"
                to={data.Program !== "" ? "/setup/create/0" : ""}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: current,
                }}
                icon={info.icons.add}
              />
            </div>
          </div>
        </>
      }
      list={
        data.Program !== "" ? (
          setup.map((item, i) =>
            item.PRG_Code === data.Program &&
            item.CRR_Code === current.CRR_Code ? (
              <ListCard
                slot1={item.Component}
                slot2={item.Course}
                slot3={item.STP_Created}
                slot4={item.Curriculum}
                slot5={item.Program}
                view={info.icons.view}
                link={`/course/view/${item.CRSID}`}
                state={{ data: item }}
              />
            ) : null
          )
        ) : (
          <p className="fw-semibold text-center p-3 text-secondary">
            Select Department & Program
          </p>
        )
      }
    />
  );
}
