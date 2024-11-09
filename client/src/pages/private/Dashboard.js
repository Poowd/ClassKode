import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../../layout/grid/DashboardTemplate";
import { DashboardCardContent } from "../../component/placeholder/content/DashboardCardContent";
import { DefaultButton } from "../../component/button/DefaultButton";
import useChart from "../../hook/chart/useChart";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import useLineChart from "../../hook/chart/useLineChart";

export function Dashboard() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [currentacademicyear, setCurrentAcademicYear] = useState([]);
  const [currentcurriculum, setCurrentCurriculum] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState();
  const [dataEntryCount, setDataEntryCount] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("current-curriculum", setCurrentCurriculum);
    data_get("class-schedule-list", setSchedule);
    data_get("project-total-population", setTotalPopulation);
    data_get("data-entry-count", setDataEntryCount);
  }, []);

  return (
    <DashboardTemplate
      cardcolor={"gradient-bg-light-blue"}
      card1={
        <DashboardCardContent
          title={"Academic Year"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.others.calendar}
              function={() => navigate("/utilities/academicyear")}
            />
          }
          content={currentacademicyear.AcademicYear}
        />
      }
      card2={
        <DashboardCardContent
          title={"Curriculum"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.pages.institution.curriculum}
              function={() => navigate("/utilities/curriculum")}
            />
          }
          content={currentcurriculum.Curriculum}
        />
      }
      card3={
        <DashboardCardContent
          title={"Class Schedules"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.pages.utilities.schedule}
              function={() => navigate("/utilities/schedule")}
            />
          }
          content={`${schedule.length} classes`}
        />
      }
      card4={
        <DashboardCardContent
          title={"Events"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.others.events}
            />
          }
          content={"0"}
        />
      }
      chart1={useLineChart(
        [
          totalPopulation === undefined
            ? "n/a"
            : totalPopulation[4] === undefined
            ? "n/a"
            : totalPopulation[4].AcademicYear,
          totalPopulation === undefined
            ? "n/a"
            : totalPopulation[3] === undefined
            ? "n/a"
            : totalPopulation[3].AcademicYear,
          totalPopulation === undefined
            ? "n/a"
            : totalPopulation[2] === undefined
            ? "n/a"
            : totalPopulation[2].AcademicYear,
          totalPopulation === undefined
            ? "n/a"
            : totalPopulation[1] === undefined
            ? "n/a"
            : totalPopulation[1].AcademicYear,
          totalPopulation === undefined
            ? "n/a"
            : totalPopulation[0] === undefined
            ? "n/a"
            : totalPopulation[0].AcademicYear,
        ],
        "line",
        "x",
        "100%",
        "Total Class Population",
        [
          totalPopulation === undefined
            ? 0
            : totalPopulation[4] === undefined
            ? 0
            : totalPopulation[4].total_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[3] === undefined
            ? 0
            : totalPopulation[3].total_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[2] === undefined
            ? 0
            : totalPopulation[2].total_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[1] === undefined
            ? 0
            : totalPopulation[1].total_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[0] === undefined
            ? 0
            : totalPopulation[0].total_population,
        ],
        "Tertiary Population",
        [
          totalPopulation === undefined
            ? 0
            : totalPopulation[4] === undefined
            ? 0
            : totalPopulation[4].tertiary_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[3] === undefined
            ? 0
            : totalPopulation[3].tertiary_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[2] === undefined
            ? 0
            : totalPopulation[2].tertiary_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[1] === undefined
            ? 0
            : totalPopulation[1].tertiary_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[0] === undefined
            ? 0
            : +totalPopulation[0].tertiary_population,
        ],
        "Senior High School Population",
        [
          totalPopulation === undefined
            ? 0
            : totalPopulation[4] === undefined
            ? 0
            : totalPopulation[4].shs_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[3] === undefined
            ? 0
            : totalPopulation[3].shs_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[2] === undefined
            ? 0
            : totalPopulation[2].shs_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[1] === undefined
            ? 0
            : totalPopulation[1].shs_population,
          totalPopulation === undefined
            ? 0
            : totalPopulation[0] === undefined
            ? 0
            : +totalPopulation[0].shs_population,
        ]
      )}
      chart3={useChart(
        [
          "Department",
          "Program",
          "Section",
          "Course",
          "Room",
          "Coach",
          "Curriculum",
          "Academic Year",
        ],
        "Module Entries",
        [
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.department === undefined
            ? 0
            : dataEntryCount.department,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.program === undefined
            ? 0
            : dataEntryCount.program,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.section === undefined
            ? 0
            : dataEntryCount.section,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.course === undefined
            ? 0
            : dataEntryCount.course,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.room === undefined
            ? 0
            : dataEntryCount.room,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.coach === undefined
            ? 0
            : dataEntryCount.coach,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.curriculum === undefined
            ? 0
            : dataEntryCount.curriculum,
          dataEntryCount === undefined
            ? 0
            : dataEntryCount.academic_year === undefined
            ? 0
            : dataEntryCount.academic_year,
        ],
        "bar",
        "y",
        "100%"
      )}
      chart2={
        <>
          <main className="h-100 w-100 d-flex gap-3 justify-content-end m-0 p-3">
            <section className="h-100 w-50 p-0 m-0 d-flex justify-content-center align-items-center">
              <main className="bg-white h-100 w-100 text-center p-5 shadow-sm rounded">
                <h1 className="fw-bold display-1">
                  {dataEntryCount === undefined
                    ? 0
                    : dataEntryCount.tertiary_class_schedules === undefined
                    ? 0
                    : dataEntryCount.tertiary_class_schedules}
                </h1>
                <p className="m-0">Tertiary Class Schedules</p>
              </main>
            </section>
            <section className="h-100 w-50 p-0 m-0 d-flex justify-content-center align-items-center">
              <main className="bg-white h-100 w-100 text-center p-5 shadow-sm rounded">
                <h1 className="fw-bold display-1">
                  {dataEntryCount === undefined
                    ? 0
                    : dataEntryCount.shs_class_schedules === undefined
                    ? 0
                    : dataEntryCount.shs_class_schedules}
                </h1>
                <p className="m-0">Senior High School Class Schedules</p>
              </main>
            </section>
          </main>
        </>
      }
    />
  );
}
