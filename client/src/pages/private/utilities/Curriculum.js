import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { SelectButton } from "../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../hook/useHandleChange";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { SelectButtonItemSelected } from "../../../component/dropdown/select/SelectButtonItemSelected";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import { ListCard } from "../../../component/card/ListCard";
import { PassiveModal } from "../../../component/modal/PassiveModal";
import useModal from "../../../hook/useModal";
import { CurriculumSelector } from "./curriculum/CurriculumSelector";

export function Curriculum() {
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
  const [curriculum, setCurriculum] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("course-setup", setup, setSetup);
    post("curriculum-current", currentcrr, setCurrentCRR);
    post("curriculum", curriculum, setCurriculum);
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, Program: "" }));
  }, [data.Department]);

  useEffect(() => {
    currentcrr.map((crr, i) => setCurrentCurriculum(crr));
  }, [currentcrr]);

  return (
    <>
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
                  class="btn-outline-primary"
                  icon={<PiGearSixFill />}
                  function={() => navigate(-1)}
                />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<PiGearSixFill />}
                  function={() => navigate("/utilities/curriculum/setup")}
                  text={"setup"}
                />
                <DefaultInput placeholder="Search" />
                <DefaultButton
                  class="btn-outline-primary"
                  icon={<PiGearSixFill />}
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
              </div>
            </div>
          </>
        }
        list={
          curriculum.length > 0
            ? curriculum.map((item, i) => (
                <ListCard
                  slot1={item.CRR_Code}
                  slot2={item.Curriculum}
                  slot3={item.CRR_Created}
                  slot4={"n/a"}
                  slot5={"n/a"}
                  link={"/institution/projection/view/" + item.PRJID}
                  state={"a"}
                />
              ))
            : null
        }
      />
    </>
  );
}
