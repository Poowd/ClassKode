import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { useNavigate, useParams } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { MdArrowBackIosNew } from "react-icons/md";
import useConfiguration from "../../../../hook/useConfiguration";

export function CoachAssignment() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [currentacademicyear, setCurrentAcademicYear] = useState([]);
  const [current, setCurrent] = useState([]);
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_post("assign-onyear-list", { data: params.id }, setAssignment);
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
            <DefaultButton
              class="w-100 border py-2"
              icon={info.icons.forms.view}
              text="Current Academic Year"
              function={() =>
                navigate(`/academic-year/view/${currentacademicyear.ACYID}`)
              }
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
                class="px-2"
                icon={info.icons.navigation.back}
                text="Back"
                function={() => navigate(-1)}
              />
              <DefaultInput placeholder="Search" />
              <LinkButton
                to={`/assignment/create/${params.id}`}
                state={{
                  academicyear: currentacademicyear,
                }}
                class="btn-primary px-2"
                text="Create"
                icon={info.icons.forms.add}
              />
            </div>
          </div>
        </>
      }
      list={
        assignment &&
        assignment.map((item, i) => (
          <ListCard
            key={i}
            slot1={`${item.CoachType}`}
            slot2={`${item.Gender === "Male" ? "Mr." : "Ms."} ${
              item.LastName
            }, ${item.FirstName} ${
              item.MiddleInitial != "" ? `${item.MiddleInitial}.` : ""
            }`}
            slot3={item.Department}
            slot4={item.AcademicYear}
            slot5={`${item.MAX} units`}
            view={info.icons.forms.view}
            link={`/coach/view/${item.SCHLID}`}
            state={{ data: item }}
          />
        ))
      }
    />
  );
}
