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
  const [get, post] = useDatabase();

  const [ay, setAY] = useState([]);
  const [curray, setCurrAY] = useState([]);
  const [current, setCurrent] = useState([]);

  const [totalcoach, setTotalCoach] = useState(0);
  const [totalparttime, setTotalParttime] = useState(0);
  const [totalfulltime, setTotalFulltime] = useState(0);
  const [totalsection, setTotalSection] = useState(0);

  useEffect(() => {
    post("sel-ay", ay, setAY);
    post("sel-cur-ay", curray, setCurrAY);
  }, []);

  useEffect(() => {
    post("total-coach", totalcoach, setTotalCoach);
    post("total-coach-type", { type: "Fulltime" }, setTotalFulltime);
    post("total-coach-type", { type: "Parttime" }, setTotalParttime);
    post("total-section", { semester: "First Semester" }, setTotalSection);
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
              text={`Details`}
              icon={info.icons.view}
            />
          </header>
          <main className="mt-2">
            <section>
              <p className="p-0 m-0 fw-semibold text-secondary">
                Academic Year
              </p>
              <h5>{current.AcademicYear}</h5>
            </section>
            <main className="mt-2">
              <section className="px-2 m-0 d-flex flex-column">
                <span>{`[ ${
                  totalcoach[0] !== undefined ? totalcoach[0].Total_Coach : null
                } ] Total Coachs`}</span>
                <section className="px-5 d-flex flex-column">
                  <span>{`[ ${
                    totalfulltime[0] !== undefined
                      ? totalfulltime[0].Total_Coach_Type
                      : null
                  } ] Fulltime`}</span>
                  <span>{`[ ${
                    totalparttime[0] !== undefined
                      ? totalparttime[0].Total_Coach_Type
                      : null
                  } ] Parttime`}</span>
                </section>
                <span>{`[ ${
                  totalsection[0] !== undefined
                    ? totalsection[0].Total_Section
                    : null
                } ] Total Section`}</span>
                <span>{`[ ${
                  totalsection[0] !== undefined
                    ? totalsection[0].Total_Population
                    : null
                } ] Total Population`}</span>
                <section className="px-5 d-flex flex-column">
                  <span>{`[ 0 ] First Year`}</span>
                  <span>{`[ 0 ] Second Year`}</span>
                  <span>{`[ 0 ] Third Year`}</span>
                  <span>{`[ 0 ] Fourth Year`}</span>
                </section>
              </section>
            </main>
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
                slot1={item.ACY_Code}
                slot2={item.AcademicYear}
                slot3={item.ACY_Created}
                slot4={item.CRR_Code}
                slot5={`${item.StartDate} : ${item.EndDate}`}
                link={null}
                state={null}
                custom={
                  item.ACY_Code === current.ACY_Code ? (
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
