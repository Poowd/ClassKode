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

  const LocalStorage = [JSON.parse(localStorage.getItem("data"))];

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
  }, []);

  useEffect(() => {
    curcurr.map((curr, i) => setCurrent(curr));
  }, [curcurr]);

  useEffect(() => {
    if (data.Department !== LocalStorage[0].Department) {
      setData((prev) => ({ ...prev, Program: "" }));
    }
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
      LocalStorage[0].Curriculum === "" &&
      LocalStorage[0].Department === "" &&
      LocalStorage[0].Program === ""
    ) {
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
              to={`/institution/curriculum/view/${current.CRRID}`}
              state={{
                data: current,
              }}
              icon={<GrView />}
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
                icon={<BiLayer />}
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
                to={data.Program !== "" ? "/institution/setup/create/0" : ""}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: current,
                }}
                icon={<RiStickyNoteAddLine />}
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
                link={`/institution/setup/view/${item.STPID}`}
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
