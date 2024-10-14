import React, { useEffect, useState } from "react";
import { DashboardTemplate } from "../../layout/grid/DashboardTemplate";
import { DashboardCardContent } from "../../component/placeholder/content/DashboardCardContent";
import { DefaultButton } from "../../component/button/DefaultButton";
import useChart from "../../hook/chart/useChart";
import useDatabase from "../../hook/useDatabase";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import { DefaultCard } from "../../component/card/DefaultCard";

export function LandingPage() {
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
    <main className="h-100 overflow-y-auto">
      <header className="dashboard-cards overflow-y-auto">
        <main className="row h-100 m-0">
          <section className="col-lg-3 col-md-4 p-2">
            <DefaultCard
              content={
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
              class={"gradient-bg-light-blue"}
            />
          </section>
          <section className="col-lg-3 col-md-4 p-2">
            <DefaultCard
              content={
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
              class={"gradient-bg-light-blue"}
            />
          </section>
          <section className="col-lg-3 col-md-4 p-2">
            <DefaultCard
              content={
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
              class={"gradient-bg-light-blue"}
            />
          </section>
          <section className="col-lg-3 col-md-4 p-2">
            <DefaultCard
              content={
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
              class={"gradient-bg-light-blue"}
            />
          </section>
        </main>
      </header>
      <main className="h-75">
        <main className="row h-100 m-0">
          <section className="col-lg-8 p-2">
            <main className="h-100"></main>
          </section>
          <section className="col-lg-4 p-2">
            <main className="h-100">
              <main className="h-100 d-flex flex-column gap-2"></main>
            </main>
          </section>
        </main>
      </main>
    </main>
  );
}
