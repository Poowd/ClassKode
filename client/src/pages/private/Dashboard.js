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
  const [get, post] = useDatabase();
  const [info] = useConfiguration();

  const [populationperyear, setPopulationPerYear] = useState([]);
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);
  const [currentay, setCurrentAY] = useState([]);
  const [currentcrr, setCurrentCRR] = useState([]);
  const [currsched, setCurrentSched] = useState([]);

  useEffect(() => {
    post("population-per-year", populationperyear, setPopulationPerYear);
    post("sel-dept", department, setDepartment);
    post("sel-prg", program, setProgram);
    post("sel-sect", section, setSection);
    post("sel-crs", course, setCourse);
    post("sel-rom", room, setRoom);
    post("sel-coach", coach, setCoach);
    post("sel-cur-ay", currentay, setCurrentAY);
    post("sel-cur-curr", currentcrr, setCurrentCRR);
    post("sel-sched", currsched, setCurrentSched);
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
          content={currentay.map((ay, i) => ay.ACY_Code)}
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
          content={currentcrr.map((ay, i) => ay.CRR_Code)}
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
