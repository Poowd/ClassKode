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
  const [current, setCurrent] = useState([]);

  const [totalcoach, setTotalCoach] = useState(0);
  const [totalparttime, setTotalParttime] = useState(0);
  const [totalfulltime, setTotalFulltime] = useState(0);
  const [totalsection, setTotalSection] = useState(0);

  useEffect(() => {
    data_get("academic-year-list", setAY);
    data_get("current-academic-year", setCurrAY);
  }, [ay, curray]);

  useEffect(() => {
    data_post("total-coach", totalcoach, setTotalCoach);
    data_post("total-coach-type", { type: "Fulltime" }, setTotalFulltime);
    data_post("total-coach-type", { type: "Parttime" }, setTotalParttime);
    data_post("total-section", { semester: "First Semester" }, setTotalSection);
  }, []);

  // useEffect(() => {
  //   curray.map((ay, i) => setCurrent(ay));
  // }, [curray]);

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
                to={"/academic-year/create/0"}
                icon={info.icons.add}
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
                slot3={item.Created}
                slot4={item.Code}
                slot5={`${item.StartDate} : ${item.EndDate}`}
                link={null}
                state={null}
                custom={
                  item.ACY_Code === curray.ACY_Code ? (
                    <>
                      <DefaultButton
                        class="custom-bg-primary-light px-2"
                        icon={info.icons.user}
                        function={() =>
                          navigate("/utilities/academicyear/assigment")
                        }
                      />
                      <DefaultButton
                        class="custom-bg-primary-light px-2"
                        icon={info.icons.users}
                        function={() =>
                          navigate("/utilities/academicyear/projection")
                        }
                      />
                    </>
                  ) : null
                }
              />
            ))
          : "none"
      }
    />
  );
}
