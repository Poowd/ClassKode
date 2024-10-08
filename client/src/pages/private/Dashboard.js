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
          content={currentacademicyear.Code}
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
          content={currentacademicyear.Curriculum}
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
        ["a", "a", "a", "a", "a"],
        "My Chart",
        [populationperyear.population],
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
