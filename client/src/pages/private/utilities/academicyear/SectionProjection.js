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
            <LinkButton
              class="btn-primary py-2"
              textclass="text-white"
              to={`/academic-year/view/${currentacademicyear.ACYID}`}
              state={{ data: current }}
              text={`Current Academic Year`}
              icon={info.icons.forms.view}
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
                class="btn-primary px-2"
                textclass="text-white"
                to={`/projection/generate/0`}
                state={{
                  academicyear: currentacademicyear,
                }}
                icon={info.icons.forms.generate}
              />
              <LinkButton
                class="btn-primary px-2"
                textclass="text-white"
                to={`/projection/create/${currentacademicyear.ACYID}`}
                state={{
                  academicyear: currentacademicyear,
                }}
                icon={info.icons.forms.add}
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
            slot3={`${item.Population} Students`}
            slot4={item.AcademicYear}
            slot5={null}
            view={info.icons.forms.view}
            link={`/section/view/${item.Section}`}
            state={{ data: item }}
          />
        ))
      }
    />
  );
}
