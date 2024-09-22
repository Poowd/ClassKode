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
  const [currsched, setCurrentSched] = useState([]);

  useEffect(() => {
    data_post("population-per-year", populationperyear, setPopulationPerYear);
    data_get("department-list", setDepartment);
    data_get("program-list", setProgram);
    data_get("section-list", setSection);
    data_get("course-list", setCourse);
    data_get("room-list", setRoom);
    data_get("coach-list", setCoach);
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("current-curriculum", setCurrentCurriculum);
    data_post("sel-sched", currsched, setCurrentSched);
  }, []);

  return (
    <DashboardTemplate
      card1={
        <DashboardCardContent
          title={"Academic Year"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.calendar}
              function={() => navigate("/utilities/academicyear")}
            />
          }
          content={currentacademicyear.map((ay, i) => ay.Code)}
        />
      }
      card2={
        <DashboardCardContent
          title={"Curriculum"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.curriculum}
              function={() => navigate("/utilities/curriculum")}
            />
          }
          content={currentcurriculum.map((crr, i) => crr.Code)}
        />
      }
      card3={
        <DashboardCardContent
          title={"Class Schedules"}
          button={
            <DefaultButton
              class="border text-light"
              icon={info.icons.schedule}
              function={() => navigate("/utilities/schedule")}
            />
          }
          content={currsched.length}
        />
      }
      card4={
        <DashboardCardContent
          title={"Events"}
          button={
            <DefaultButton class="border text-light" icon={info.icons.events} />
          }
          content={"0"}
        />
      }
      chart1={useChart(
        ["a", "a", "a", "a", "a"],
        "My Chart",
        [0, 59, 80, 81, 56, 55, 40],
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
