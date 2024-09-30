import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { Logs } from "./pages/private/miscellaneous/Logs";
import { User } from "./pages/private/miscellaneous/User";
import { Archives } from "./pages/private/miscellaneous/Archives";
import { DataController } from "./pages/private/forms/DataController";
import { CoachAssignment } from "./pages/private/utilities/academicyear/CoachAssignment";
import { SectionProjection } from "./pages/private/utilities/academicyear/SectionProjection";
import { CourseSetup } from "./pages/private/utilities/curriculum/CourseSetup";
import { FullscreenLoader } from "./component/loader/FullscreenLoader";
import { BackgroundColours } from "./pages/testing/BackgroundColours";
import { GeneratingSchedules } from "./pages/testing/Generating Schedules";
import { TimeProblem } from "./pages/testing/TimeProblem";
import { ImagetoDB } from "./pages/testing/ImagetoDB";
import { Login } from "./pages/public/Login";
import { Homepage } from "./pages/public/Homepage";
import useConfiguration from "./hook/useConfiguration";
import useHandleChange from "./hook/useHandleChange";
import { RoomSchedule } from "./pages/private/utilities/schedule/RoomSchedule";
import { SectionSchedule } from "./pages/private/utilities/schedule/SectionSchedule";
import FileInput from "./pages/testing/FileInput";
import { Setup } from "./pages/private/miscellaneous/Setup";
import { SuperAdminTopbar } from "./component/topbar/SuperAdminTopbar";
import { AdminTopbar } from "./component/topbar/AdminTopbar";
import { CoachSchedule } from "./pages/private/utilities/schedule/CoachSchedule";
import { UserTopbar } from "./component/topbar/UserTopbar";

function App() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [data, setData] = useState({
    Input: "",
  });
  const [dataChange] = useHandleChange(setData);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const status = JSON.parse(sessionStorage.getItem("loggedin"));
  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loggedin");
    navigate("/");
    window.location.reload(true);
  };

  return (
    <main className="overflow-hidden">
      {/* Loading Screen */}
      <header>
        {isLoading ? <FullscreenLoader class="position-fixed z-3" /> : ""}
      </header>
      <Routes>
        {status === true ? (
          <>
            {loggeduser.UserType === "Manager" ||
            loggeduser.UserType === "Developer" ? (
              <Route
                path={"*"}
                element={
                  <MainLayout
                    topbar={<SuperAdminTopbar />}
                    content={
                      <Routes>
                        <Route
                          path="/testing/excel"
                          element={<FileInput />}
                        ></Route>
                        <Route index element={<Dashboard />}></Route>

                        <Route path={"/institution"}>
                          <Route
                            path={"/institution/department"}
                            element={<Department />}
                          ></Route>
                          <Route
                            path={"/institution/program"}
                            element={<Program />}
                          ></Route>
                          <Route
                            path={"/institution/course"}
                            element={<Course />}
                          ></Route>
                          <Route
                            path={"/institution/section"}
                            element={<Section />}
                          ></Route>
                          <Route
                            path={"/institution/room"}
                            element={<Room />}
                          ></Route>
                          <Route
                            path={"/institution/coach"}
                            element={<Coach />}
                          ></Route>
                        </Route>

                        <Route path={"/utilities"}>
                          <Route path={"/utilities/curriculum"}>
                            <Route index element={<Curriculum />}></Route>
                            <Route
                              path={"/utilities/curriculum/setup/:id"}
                              element={<CourseSetup />}
                            ></Route>
                          </Route>
                          <Route path={"/utilities/academicyear"}>
                            <Route index element={<AcademicYear />}></Route>
                            <Route
                              path={"/utilities/academicyear/assigment"}
                              element={<CoachAssignment />}
                            ></Route>
                            <Route
                              path={"/utilities/academicyear/projection"}
                              element={<SectionProjection />}
                            ></Route>
                          </Route>
                          <Route path={"/utilities/schedule"}>
                            <Route index element={<Schedule />}></Route>
                            <Route
                              path={"/utilities/schedule/room"}
                              element={<RoomSchedule />}
                            ></Route>
                            <Route
                              path={"/utilities/schedule/section"}
                              element={<SectionSchedule />}
                            ></Route>
                            <Route
                              path={"/utilities/schedule/coach"}
                              element={<CoachSchedule />}
                            ></Route>
                          </Route>
                          <Route
                            path={"/utilities/locator"}
                            element={<Locator />}
                          ></Route>
                        </Route>

                        <Route path={"/miscellaneous"}>
                          <Route
                            path={"/miscellaneous/archive"}
                            element={<Archives />}
                          ></Route>
                          <Route
                            path={"/miscellaneous/log"}
                            element={<Logs />}
                          ></Route>
                          <Route
                            path={"/miscellaneous/user"}
                            element={<User />}
                          ></Route>
                          <Route
                            path={"/miscellaneous/setup"}
                            element={<Setup />}
                          ></Route>
                        </Route>

                        <Route
                          path={"/:module/:form/:id"}
                          element={<DataController />}
                        ></Route>

                        <Route path={"/*"} element={<Error404 />}></Route>
                      </Routes>
                    }
                  />
                }
              ></Route>
            ) : loggeduser.UserType === "Admin" ? (
              <Route
                path={"*"}
                element={
                  <MainLayout
                    topbar={<AdminTopbar />}
                    content={
                      <Routes>
                        <Route index element={<Dashboard />}></Route>
                        <>
                          {loggeduser.PermissionLevel >= 0 ? (
                            <Route path={"/institution"}>
                              <Route
                                path={"/institution/department"}
                                element={<Department />}
                              ></Route>
                              <Route
                                path={"/institution/program"}
                                element={<Program />}
                              ></Route>
                              <Route
                                path={"/institution/course"}
                                element={<Course />}
                              ></Route>
                              <Route
                                path={"/institution/section"}
                                element={<Section />}
                              ></Route>
                              <Route
                                path={"/institution/room"}
                                element={<Room />}
                              ></Route>
                              <Route
                                path={"/institution/coach"}
                                element={<Coach />}
                              ></Route>
                            </Route>
                          ) : null}
                        </>
                        <>
                          {loggeduser.PermissionLevel >= 1 ? (
                            <Route path={"/utilities"}>
                              <Route path={"/utilities/curriculum"}>
                                <Route index element={<Curriculum />}></Route>
                                <Route
                                  path={"/utilities/curriculum/setup/:id"}
                                  element={<CourseSetup />}
                                ></Route>
                              </Route>
                              <Route path={"/utilities/academicyear"}>
                                <Route index element={<AcademicYear />}></Route>
                                <Route
                                  path={"/utilities/academicyear/assigment"}
                                  element={<CoachAssignment />}
                                ></Route>
                                <Route
                                  path={"/utilities/academicyear/projection"}
                                  element={<SectionProjection />}
                                ></Route>
                              </Route>
                              <Route path={"/utilities/schedule"}>
                                <Route index element={<Schedule />}></Route>
                                <Route
                                  path={"/utilities/schedule/room"}
                                  element={<RoomSchedule />}
                                ></Route>
                                <Route
                                  path={"/utilities/schedule/section"}
                                  element={<SectionSchedule />}
                                ></Route>
                                <Route
                                  path={"/utilities/schedule/coach"}
                                  element={<CoachSchedule />}
                                ></Route>
                              </Route>
                              <Route
                                path={"/utilities/locator"}
                                element={<Locator />}
                              ></Route>
                            </Route>
                          ) : null}
                        </>
                        <>
                          {loggeduser.PermissionLevel >= 2 ? (
                            <Route
                              path={"/:module/:form/:id"}
                              element={<DataController />}
                            ></Route>
                          ) : null}
                        </>
                        <Route path={"/*"} element={<Error404 />}></Route>
                      </Routes>
                    }
                  />
                }
              ></Route>
            ) : loggeduser.UserType === "User" ? (
              <Route
                path={"*"}
                element={
                  <MainLayout
                    topbar={<UserTopbar />}
                    content={
                      <Routes>
                        <Route index element={<Dashboard />}></Route>
                        <Route path={"/utilities"}>
                          <Route path={"/utilities/schedule"}>
                            <Route index element={<Schedule />}></Route>
                            <Route
                              path={"/utilities/schedule/room"}
                              element={<RoomSchedule />}
                            ></Route>
                            <Route
                              path={"/utilities/schedule/section"}
                              element={<SectionSchedule />}
                            ></Route>
                          </Route>
                          <Route
                            path={"/utilities/locator"}
                            element={<Locator />}
                          ></Route>
                        </Route>
                      </Routes>
                    }
                  />
                }
              ></Route>
            ) : loggeduser.UserType === "Developer" ? (
              <Route path={"/testing"}>
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
                <main className="vh-100 overflow-hidden">
                  <Homepage />
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
