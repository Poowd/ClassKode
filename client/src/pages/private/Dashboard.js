import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../../layout/grid/DashboardTemplate";
import { DashboardCardContent } from "../../component/placeholder/content/DashboardCardContent";
import { LuCalendarDays } from "react-icons/lu";
import { DefaultButton } from "../../component/button/DefaultButton";
import { TbWallpaper } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { CChart } from "@coreui/react-chartjs";
import useChart from "../../hook/chart/useChart";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);
  const [currentay, setCurrentAY] = useState([]);
  const [currentcrr, setCurrentCRR] = useState([]);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("section", section, setSection);
    post("course", course, setCourse);
    post("room", room, setRoom);
    post("coach", coach, setCoach);
    post("academicyear-current", currentay, setCurrentAY);
    post("curriculum-current", currentcrr, setCurrentCRR);
  }, []);

  const [chart1] = useChart(
    ["a", "a", "a", "a", "a", "a", "a"],
    "My Chart",
    [65, 59, 80, 81, 56, 55, 40],
    "line",
    "x",
    "auto",
    "100%"
  );
  const [chart2] = useChart(
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
  );
  const [chart3] = useChart(
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
  );

  return (
    <DashboardTemplate
      card1={
        <DashboardCardContent
          title={"Academic Year"}
          button={
            <DefaultButton
              class="border text-light"
              icon={<LuCalendarDays />}
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
              icon={<TbWallpaper />}
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
              icon={<LuCalendarClock />}
              function={() => navigate("/utilities/schedule")}
            />
          }
          content={"0"}
        />
      }
      card4={
        <DashboardCardContent
          title={"Events"}
          button={
            <DefaultButton
              class="border text-light"
              icon={<MdOutlineEmojiEvents />}
            />
          }
          content={"0"}
        />
      }
      chart1={chart1}
      chart2={chart2}
      chart3={chart3}
    />
  );
}
