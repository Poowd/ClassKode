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
import { RoomSchedule } from "./pages/private/utilities/schedule/RoomSchedule";
import { SectionSchedule } from "./pages/private/utilities/schedule/SectionSchedule";
import { FileInput } from "./pages/testing/FileInput";
import { Setup } from "./pages/private/miscellaneous/Setup";
import { SuperAdminTopbar } from "./component/topbar/SuperAdminTopbar";
import { AdminTopbar } from "./component/topbar/AdminTopbar";
import { CoachSchedule } from "./pages/private/utilities/schedule/CoachSchedule";
import { UserTopbar } from "./component/topbar/UserTopbar";
import useConfiguration from "./hook/useConfiguration";
import { LandingPage } from "./pages/private/LandingPage";
import { SectionStudentSchedule } from "./pages/private/user view/SectionStudentSchedule";
import { StudentSchedule } from "./pages/private/user view/StudentSchedule";
import { CoachViewSchedule } from "./pages/private/user view/CoachViewSchedule";
import useDatabase from "./hook/useDatabase";
import { Register } from "./pages/public/Register";
import { ExamSchedule } from "./pages/private/utilities/ExamSchedule";
import { About } from "./pages/public/About";
import { Features } from "./pages/public/Features";
import { Team } from "./pages/public/Team";
import { Timetabling } from "./pages/testing/Timetabling";
import { SectionExamination } from "./pages/private/utilities/examination/SectionExamination";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [test, setTest] = useState([]);
  const [account, setAccount] = useState([]);
  const [checkstatus, setCheckStatus] = useState(false);

  const status = JSON.parse(sessionStorage.getItem("loggedin"));
  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const resetStatus = (status) => {
    data_post("reset-status", { data: status }, setTest);
  };

  const getCookies = () => {
    try {
      const cookies = document.cookie.split(";");
      const cookieMap = {};
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookieMap[name] = value;
      });
      const cookieVal = cookieMap["accountCookies"];
      setAccount(JSON.parse(cookieVal));
      return setCheckStatus(true);
    } catch (error) {
      return false;
    }
  };

  //console.log(document.cookie.split(";"));

  useEffect(() => {
    // Simulate an API call
    getCookies();
    const dateObject = new Date();
    if (
      (dateObject.getHours() >= 21 && dateObject.getHours() <= 24) ||
      (dateObject.getHours() >= 1 && dateObject.getHours() < 7)
    ) {
      resetStatus("Not Set");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   if (checkstatus === true) {
  //     navigate("/");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

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
                        <Route index element={<Dashboard />}></Route>

                        <Route
                          path="/timetable"
                          element={<Timetabling />}
                        ></Route>

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
                              path={"/utilities/academicyear/assigment/:id"}
                              element={<CoachAssignment />}
                            ></Route>
                            <Route
                              path={"/utilities/academicyear/projection/:id"}
                              element={<SectionProjection />}
                            ></Route>
                          </Route>

                          <Route path={"/utilities/examinations"}>
                            <Route index element={<ExamSchedule />}></Route>
                            <Route
                              path={"/utilities/examinations/section"}
                              element={<SectionExamination />}
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

                          <Route path={"/utilities/locator"}>
                            <Route index element={<Locator />}></Route>
                          </Route>
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
                            <>
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
                            </>
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
                              <Route path={"/utilities/examinations"}>
                                <Route index element={<ExamSchedule />}></Route>
                              </Route>
                              {/* <Route path={"/utilities/schedule"}>
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
                              ></Route> */}
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
                        <Route index element={<LandingPage />}></Route>
                        {loggeduser.PermissionLevel == 0 ? (
                          <Route path={"/"}>
                            <Route
                              path={"/my-schedules"}
                              element={<StudentSchedule />}
                            ></Route>
                          </Route>
                        ) : null}
                        {loggeduser.PermissionLevel >= 0 ? (
                          <Route path={"/"}>
                            <Route
                              path={"/section-schedules"}
                              element={<SectionStudentSchedule />}
                            ></Route>
                            <Route
                              path={"/faculty-locator"}
                              element={<Locator />}
                            ></Route>
                          </Route>
                        ) : null}
                        {loggeduser.PermissionLevel == 1 ? (
                          <Route path={"/"}>
                            <Route
                              path={"/my-schedules"}
                              element={<CoachViewSchedule />}
                            ></Route>
                          </Route>
                        ) : null}
                        <Route path={"/*"} element={<Error404 />}></Route>
                      </Routes>
                    }
                  />
                }
              ></Route>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Route path={"/"} element={<Homepage />}></Route>
            <Route path={"/about"} element={<About />}></Route>
            <Route path={"/features"} element={<Features />}></Route>
            <Route path={"/team"} element={<Team />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/register"} element={<Register />}></Route>
            <Route
              path={"/*"}
              element={
                <main className="vh-100">
                  <Error404 />
                </main>
              }
            ></Route>
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
