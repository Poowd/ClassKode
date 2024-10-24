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

  const [ay, setAY] = useState([]);
  const [curray, setCurrAY] = useState([]);

  useEffect(() => {
    data_get("academic-year-list", setAY);
    data_get("current-academic-year", setCurrAY);
  }, []);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="mb-3">
            <h5 className="p-0 m-0">Academic Year Details</h5>
            <p>Entries: {ay.length} row/s</p>
            <LinkButton
              class="btn-primary py-2"
              textclass="text-white"
              to={`/academic-year/view/${curray.ACYID}`}
              state={[]}
              text={`Current Academic Year`}
              icon={info.icons.forms.view}
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
                class="btn-primary px-2"
                textclass="text-white"
                to={"/academic-year/create/0"}
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
                slot3={item.Code}
                slot4={`${item.StartDate} - ${item.EndDate}`}
                slot5={null}
                link={null}
                state={null}
                custom={
                  item.ACY_Code === curray.ACY_Code ? (
                    <>
                      <DefaultButton
                        class="custom-bg-primary-light px-2"
                        icon={info.icons.pages.institution.coach}
                        function={() =>
                          navigate("/utilities/academicyear/assigment")
                        }
                      />
                      <DefaultButton
                        class="custom-bg-primary-light px-2"
                        icon={info.icons.pages.institution.section}
                        function={() =>
                          navigate("/utilities/academicyear/projection")
                        }
                      />
                    </>
                  ) : null
                }
              />
            ))
          : ""
      }
    />
  );
}
