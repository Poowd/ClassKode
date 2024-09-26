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
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [currentacademicyear, setCurrentAcademicYear] = useState([]);
  const [current, setCurrent] = useState([]);
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("assign-list", setAssignment);
  }, []);

  // useEffect(() => {
  //   currentacademicyear.map((ay, i) => setCurrent(ay));
  // }, [currentacademicyear]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="mb-3">
            <h5 className="p-0 m-0">Assigned Coaches Details</h5>
            <p>Entries: {assignment.length} row/s</p>
            <LinkButton
              class="btn-primary py-2"
              textclass="text-white"
              to={`/academic-year/view/${currentacademicyear.ACYID}`}
              state={{ data: current }}
              text={`Current Academic Year`}
              icon={info.icons.view}
            />
          </header>
          <section>
            <section>
              <h6></h6>
              <ul className="list-group list-group-flush"></ul>
            </section>
          </section>
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
                to={`/assignment/create/${currentacademicyear.ACYID}`}
                state={{
                  academicyear: currentacademicyear,
                }}
                icon={info.icons.add}
              />
            </div>
          </div>
        </>
      }
      list={
        assignment &&
        assignment.map((item, i) =>
          item.AcademicYear === currentacademicyear.Code ? (
            <ListCard
              key={i}
              slot1={item.CoachType}
              slot2={item.LastName}
              slot3={item.Created}
              slot4={item.AcademicYear}
              slot5={`${item.MAX} units`}
              view={info.icons.view}
              link={`/coach/view/${item.SCHLID}`}
              state={{ data: item }}
            />
          ) : null
        )
      }
    />
  );
}
