import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { ListCard } from "../../../component/card/ListCard";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import useConfiguration from "../../../hook/useConfiguration";

export function AcademicYear() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [ay, setAY] = useState([]);
  const [curray, setCurrAY] = useState([]);

  useEffect(() => {
    data_get("academic-year-list", setAY);
    data_get("current-academic-year", setCurrAY);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <FileMaintainanceTemplate
      loader={isLoading}
      sidepanel={
        <main className="p-2">
          <header className="mb-3">
            <h5 className="p-0 m-0">Academic Year Details</h5>
            <p>Entries: {ay.length} row/s</p>
            <h5>{curray.AcademicYear}</h5>
            <DefaultButton
              class="w-100 border py-2"
              icon={info.icons.forms.view}
              text="Current Academic Year"
              function={() => navigate(`/academic-year/view/${curray.ACYID}`)}
            />
          </header>
          <section>
            <section></section>
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
                to={"/academic-year/create/0"}
                class="btn-primary px-2"
                text="Create"
                icon={info.icons.forms.add}
              />
            </div>
          </div>
        </>
      }
      list={
        ay.length > 0
          ? ay.map((item, i) => (
              <ListCard
                slot1={item.Code}
                slot2={item.AcademicYear}
                slot3={item.Semester}
                slot4={`${item.StartDate} - ${item.EndDate}`}
                slot5={item.Curriculum}
                link={null}
                state={null}
                custom={
                  <>
                    <LinkButton
                      to={`/utilities/academicyear/assigment/${item.Code}`}
                      class="btn-info px-2"
                      icon={info.icons.pages.institution.coach}
                    />
                    <LinkButton
                      to={`/utilities/academicyear/projection/${item.Code}`}
                      class="btn-info px-2"
                      icon={info.icons.pages.institution.section}
                    />
                  </>
                }
              />
            ))
          : ""
      }
    />
  );
}
