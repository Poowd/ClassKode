import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../../layout/grid/DashboardTemplate";
import { DashboardCardContent } from "../../component/placeholder/content/DashboardCardContent";
import { DefaultButton } from "../../component/button/DefaultButton";
import useChart from "../../hook/chart/useChart";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";

export function Dashboard() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [populationperyear, setPopulationPerYear] = useState([]);
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);
  const [currentacademicyear, setCurrentAcademicYear] = useState([]);
  const [currentcurriculum, setCurrentCurriculum] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState();

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_get("program-list", setProgram);
    data_get("section-list", setSection);
    data_get("course-list", setCourse);
    data_get("room-list", setRoom);
    data_get("coach-list", setCoach);
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("current-curriculum", setCurrentCurriculum);
    data_get("class-schedule-list", setSchedule);
    data_get("total-population-check", setPopulationPerYear);
    data_get("project-total-population", setTotalPopulation);
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
      chart1={useChart(
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
        "My Chart",
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
        "line",
        "x",
        "auto",
        "100%"
      )}
      chart2={useChart(
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
        "My Chart",
        [
          department.length,
          program.length,
          section.length,
          course.length,
          room.length,
          coach.length,
          5,
          5,
        ],
        "bar",
        "y",
        "100%"
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
        "My Chart",
        [5, 5, 5, 5, 5, 5, 5, 5],
        "bar",
        "y",
        "100%"
      )}
    />
  );
}
