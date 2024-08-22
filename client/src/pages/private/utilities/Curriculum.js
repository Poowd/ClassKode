import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";

export function Curriculum() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [info] = useConfiguration();
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
                text={`Details`}
                icon={info.icons.view}
              />
            </header>
            <main className="mt-2">
              <section>
                <p className="p-0 m-0 fw-semibold text-secondary">Curriculum</p>
                <h5>{current.Curriculum}</h5>
              </section>
              <section className="px-2 m-0 d-flex flex-column">
                <span>{`[ 0 ] Total Departments`}</span>
                <span>{`[ 0 ] Total Programs`}</span>
                <span>{`[ 0 ] Total Courses`}</span>
                <section className="px-5 d-flex flex-column">
                  <span>{`[ 0 ] Lectures`}</span>
                  <span>{`[ 0 ] Laboratories`}</span>
                </section>
              </section>
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
                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/institution/curriculum/create/0"}
                  state={{
                    curriculum: current,
                  }}
                  icon={info.icons.add}
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
                  view={info.icons.package}
                  link={"/utilities/curriculum/setup"}
                  state={null}
                />
              ))
            : "none"
        }
      />
    </>
  );
}
