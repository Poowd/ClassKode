import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Form, Link } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Dashboard } from "./pages/private/Dashboard";
import { Error404 } from "./component/placeholder/Error404";
import { Department } from "./pages/private/file maintainance/Department";
import { Curriculum } from "./pages/private/utilities/Curriculum";
import { Program } from "./pages/private/file maintainance/Program";
import { Course } from "./pages/private/file maintainance/Course";
import { Section } from "./pages/private/file maintainance/Section";
import { Room } from "./pages/private/file maintainance/Room";
import { Coach } from "./pages/private/file maintainance/Coach";
import { AcademicYear } from "./pages/private/utilities/AcademicYear";
import { Schedule } from "./pages/private/utilities/Schedule";
import { Locator } from "./pages/private/utilities/Locator";
import { Setup } from "./pages/private/miscellaneous/Setup";
import { User } from "./pages/private/miscellaneous/User";
import { Logs } from "./pages/private/miscellaneous/Logs";
import { Archives } from "./pages/private/miscellaneous/Archives";
import { DataController } from "./pages/private/forms/DataController";
import { RoomSchedule } from "./pages/private/utilities/schedule/RoomSchedule";
import { SectionSchedule } from "./pages/private/utilities/schedule/SectionSchedule";
import { CoachAssignment } from "./pages/private/utilities/academicyear/CoachAssignment";
import { SectionProjection } from "./pages/private/utilities/academicyear/SectionProjection";
import { CourseSetup } from "./pages/private/utilities/curriculum/CourseSetup";
import { FullscreenLoader } from "./component/loader/FullscreenLoader";
import { BackgroundColours } from "./pages/components/BackgroundColours";
import { GeneratingSchedules } from "./pages/components/Generating Schedules";
import { TimeProblem } from "./pages/components/TimeProblem";
import { ImagetoDB } from "./pages/components/ImagetoDB";
import { Login } from "./pages/public/Login";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const status = JSON.parse(sessionStorage.getItem("loggedin"));
  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  return (
    <main className="overflow-hidden">
      {/* Loading Screen */}
      <header>
        {isLoading ? <FullscreenLoader class="position-absolute z-3" /> : ""}
      </header>
      <Routes>
        {status === true ? (
          <>
            <Route
              path="/testing/bgcolour"
              element={<BackgroundColours />}
            ></Route>
            <Route path="/testing/imgtodb" element={<ImagetoDB />}></Route>
            <Route path="/testing/time" element={<TimeProblem />}></Route>
            <Route
              path="/testing/gensched"
              element={<GeneratingSchedules />}
            ></Route>

            {loggeduser[0].UserType === "Manager" ? (
              <Route path={"/"}>
                <Route
                  path={"/"}
                  element={
                    <MainLayout
                      user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                      content={<Dashboard />}
                    />
                  }
                ></Route>
                <Route path={"/institution"}>
                  <Route
                    path={"/institution/department"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Department />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/institution/program"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Program />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/institution/course"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Course />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/institution/section"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Section />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/institution/room"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Room />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/institution/coach"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Coach />}
                      />
                    }
                  ></Route>
                  {/* a */}
                  <Route
                    path={"/institution/:module/:form/:id"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<DataController />}
                      />
                    }
                  ></Route>
                </Route>
                <Route path={"/utilities"}>
                  <Route path={"/utilities/curriculum"}>
                    <Route
                      path={"/utilities/curriculum/"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<Curriculum />}
                        />
                      }
                    ></Route>
                    <Route
                      path={"/utilities/curriculum/setup"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<CourseSetup />}
                        />
                      }
                    ></Route>
                  </Route>
                  <Route path={"/utilities/academicyear"}>
                    <Route
                      path={"/utilities/academicyear/"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<AcademicYear />}
                        />
                      }
                    ></Route>
                    <Route
                      path={"/utilities/academicyear/assigment"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<CoachAssignment />}
                        />
                      }
                    ></Route>
                    <Route
                      path={"/utilities/academicyear/projection"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<SectionProjection />}
                        />
                      }
                    ></Route>
                  </Route>
                  <Route path={"/utilities/schedule"}>
                    <Route
                      path={"/utilities/schedule/"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<Schedule />}
                        />
                      }
                    ></Route>
                    <Route
                      path={"/utilities/schedule/room"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<RoomSchedule />}
                        />
                      }
                    ></Route>
                    <Route
                      path={"/utilities/schedule/section"}
                      element={
                        <MainLayout
                          user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                          content={<SectionSchedule />}
                        />
                      }
                    ></Route>
                  </Route>
                  <Route
                    path={"/utilities/locator"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Locator />}
                      />
                    }
                  ></Route>
                </Route>
                <Route path={"/miscellaneous"}>
                  <Route
                    path={"/miscellaneous/archive"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Archives />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/miscellaneous/log"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Logs />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/miscellaneous/user"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<User />}
                      />
                    }
                  ></Route>
                  <Route
                    path={"/miscellaneous/setup"}
                    element={
                      <MainLayout
                        user={`${loggeduser[0].LastName}, ${loggeduser[0].FirstName}`}
                        content={<Setup />}
                      />
                    }
                  ></Route>
                </Route>
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
            ) : loggeduser[0].UserType === "Admin" ? (
              <Route path={"/"}>
                <Route path={"/"} element={"hi"}></Route>
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
            ) : loggeduser[0].UserType === "User" ? (
              <Route path={"/"}>
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Route
              path={"/"}
              element={
                <main>
                  <h1>Not Authenticated</h1>
                  <Link to={"/login"} className="btn btn-primary">
                    Login
                  </Link>
                </main>
              }
            ></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/*"} element={<Error404 />}></Route>
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
