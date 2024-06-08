import React from "react";
import { DashboardTemplate } from "../../layout/grid/DashboardTemplate";
import { DashboardCardContent } from "../../component/placeholder/content/DashboardCardContent";
import { LuCalendarDays } from "react-icons/lu";
import { DefaultButton } from "../../component/button/DefaultButton";
import { TbWallpaper } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { CChart } from "@coreui/react-chartjs";
import useChart from "../../hook/chart/useChart";

export function Dashboard() {
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
    [5, 5, 5, 5, 5, 5, 5, 5],
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
          button={<DefaultButton class="border" icon={<LuCalendarDays />} />}
        />
      }
      card2={
        <DashboardCardContent
          title={"Curriculum"}
          button={<DefaultButton class="border" icon={<TbWallpaper />} />}
        />
      }
      card3={
        <DashboardCardContent
          title={"Class Schedules"}
          button={<DefaultButton class="border" icon={<LuCalendarClock />} />}
        />
      }
      card4={
        <DashboardCardContent
          title={"Events"}
          button={
            <DefaultButton class="border" icon={<MdOutlineEmojiEvents />} />
          }
        />
      }
      chart1={chart1}
      chart2={chart2}
      chart3={chart3}
    />
  );
}
