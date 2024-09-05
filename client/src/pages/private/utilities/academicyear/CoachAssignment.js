import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { MdArrowBackIosNew } from "react-icons/md";
import useConfiguration from "../../../../hook/useConfiguration";

export function CoachAssignment() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();

  const [ay, setAY] = useState([]);
  const [curray, setCurrAY] = useState([]);
  const [current, setCurrent] = useState([]);
  const [asgn, setAsgn] = useState([]);

  useEffect(() => {
    post("sel-ay", ay, setAY);
    post("sel-cur-ay", curray, setCurrAY);
    post("sel-asgn", asgn, setAsgn);
  }, []);

  useEffect(() => {
    curray.map((ay, i) => setCurrent(ay));
  }, [curray]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100">
          <header className="d-flex justify-content-end align-items-center border-bottom pb-2 gap-2">
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={`/academic-year/view/${current.ACYID}`}
              state={{ data: current }}
              icon={info.icons.view}
            />
          </header>
          <main className="mt-2">
            <p className="p-0 m-0 fw-semibold text-secondary">Academic Year</p>
            <h5>{current.AcademicYear}</h5>
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
                to={"/assignment/create/0"}
                state={{
                  academicyear: current,
                }}
                icon={info.icons.add}
              />
            </div>
          </div>
        </>
      }
      list={
        asgn.length > 0
          ? asgn.map((item, i) =>
              item.ACY_Code === current.ACY_Code ? (
                <ListCard
                  slot1={item.CoachType}
                  slot2={`${item.FirstName} ${
                    item.MiddleInitial !== null ? `${item.MiddleInitial}.` : ""
                  } ${item.LastName}`}
                  slot3={item.ASG_Created}
                  slot4={item.ACY_Code}
                  slot5={`${item.MinUnits} units - ${item.MaxUnits} units`}
                  view={info.icons.view}
                  link={`/coach/view/${item.CCHID}`}
                  state={{ data: item }}
                />
              ) : null
            )
          : "none"
      }
    />
  );
}
