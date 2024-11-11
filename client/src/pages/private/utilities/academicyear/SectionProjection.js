import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { MdArrowBackIosNew } from "react-icons/md";
import useConfiguration from "../../../../hook/useConfiguration";

export function SectionProjection() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [currentacademicyear, setCurrentAcademicYear] = useState([]);
  const [current, setCurrent] = useState([]);
  const [projection, setProjection] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_post("project-onyear-list", { data: params.id }, setProjection);
  }, []);

  // useEffect(() => {
  //   currentacademicyear.map((ay, i) => setCurrent(ay));
  // }, [currentacademicyear]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="mb-3">
            <h5 className="p-0 m-0">Projected Sections Details</h5>
            <p>Entries: {projection.length} row/s</p>
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
                to={`/projection/create/${currentacademicyear.ACYID}`}
                state={{
                  academicyear: currentacademicyear,
                }}
                class="btn-outline-primary px-2"
                icon={info.icons.forms.add}
              />
              <LinkButton
                to={`/projection/generate/0`}
                state={{
                  academicyear: currentacademicyear,
                }}
                text="Upload"
                class="btn-primary px-2"
                icon={info.icons.forms.generate}
              />
            </div>
          </div>
        </>
      }
      list={
        projection &&
        projection.map((item, i) => (
          <ListCard
            slot1={`${item.Population} Students`}
            slot2={item.Section}
            slot3={item.Program}
            slot4={item.AcademicYear}
            slot5={item.YearLevel}
            view={info.icons.forms.view}
            link={`/section/view/${item.Section}`}
            state={{ data: item }}
          />
        ))
      }
    />
  );
}
