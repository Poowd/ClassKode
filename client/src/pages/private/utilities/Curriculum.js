import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import { ListCard } from "../../../component/card/ListCard";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";

export function Curriculum() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();

  const [curr, setCurr] = useState([]);
  const [curcurr, setCurCurr] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    post("sel-curr", curr, setCurr);
    post("sel-cur-curr", curcurr, setCurCurr);
  }, []);

  useEffect(() => {
    curcurr.map((curr, i) => setCurrent(curr));
  }, [curcurr]);

  return (
    <>
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
                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/institution/curriculum/create/0"}
                  state={{
                    curriculum: current,
                  }}
                  icon={<RiStickyNoteAddLine />}
                />
              </div>
            </div>
          </>
        }
        list={
          curr.length > 0
            ? curr.map((item, i) => (
                <ListCard
                  slot1={item.CRR_Code}
                  slot2={item.Curriculum}
                  slot3={item.CRR_Created}
                  slot4={"n/a"}
                  slot5={"n/a"}
                  link={null}
                  state={null}
                  custom={
                    <DefaultButton
                      class="custom-bg-primary-light px-2"
                      icon={<LuPackageOpen />}
                      function={() => navigate("/utilities/curriculum/setup")}
                    />
                  }
                />
              ))
            : "none"
        }
      />
    </>
  );
}
