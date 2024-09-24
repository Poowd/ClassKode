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
import { DefaultInput } from "./component/input/DefaultInput";
import useHandleChange from "./hook/useHandleChange";
import { RoomSchedule } from "./pages/private/utilities/schedule/RoomSchedule";
import { SectionSchedule } from "./pages/private/utilities/schedule/SectionSchedule";
import { DefaultButton } from "./component/button/DefaultButton";
import FileInput from "./pages/testing/FileInput";
import { Setup } from "./pages/private/miscellaneous/Setup";

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

  const quicknav = () => {
    switch (`${data.Input}`) {
      case "list department":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list program":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list course":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list coach":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list section":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list room":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      default:
        navigate("/");
    }
    document.getElementById("Input").value = "";
    setData({ Input: "" });
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
                path={"/*"}
                element={
                  <MainLayout
                    usericon={info.icons.hiddenuser}
                    helpicon={info.icons.help}
                    quicknav={info.icons.quicknav}
                    quicknavaction={
                      <main>
                        <section className="d-flex gap-1">
                          <DefaultInput
                            label="inputs"
                            id="Input"
                            name="Input"
                            trigger={dataChange}
                          />
                          <DefaultButton
                            class="btn-danger py-2 px-2"
                            reversed={true}
                            text="Enter"
                            function={quicknav}
                          />
                        </section>
                      </main>
                    }
                    menuicon={info.icons.menu}
                    logout={handleLogout}
                    user={`${loggeduser.LastName}, ${loggeduser.FirstName}`}
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
                          <Route path={"*"} element={<Error404 />}></Route>
                        </Route>

                        <Route path={"/utilities"}>
                          <Route path={"/utilities/curriculum"}>
                            <Route
                              path={"/utilities/curriculum/"}
                              element={<Curriculum />}
                            ></Route>
                            <Route
                              path={"/utilities/curriculum/setup/:id"}
                              element={<CourseSetup />}
                            ></Route>
                            <Route path={"*"} element={<Error404 />}></Route>
                          </Route>

                          <Route path={"/utilities/academicyear"}>
                            <Route
                              path={"/utilities/academicyear/"}
                              element={<AcademicYear />}
                            ></Route>
                            <Route
                              path={"/utilities/academicyear/assigment"}
                              element={<CoachAssignment />}
                            ></Route>
                            <Route
                              path={"/utilities/academicyear/projection"}
                              element={<SectionProjection />}
                            ></Route>
                            <Route path={"*"} element={<Error404 />}></Route>
                          </Route>

                          <Route path={"/utilities/schedule"}>
                            <Route
                              path={"/utilities/schedule/"}
                              element={<Schedule />}
                            ></Route>
                            <Route
                              path={"/utilities/schedule/room"}
                              element={<RoomSchedule />}
                            ></Route>
                            <Route
                              path={"/utilities/schedule/section"}
                              element={<SectionSchedule />}
                            ></Route>
                            <Route path={"*"} element={<Error404 />}></Route>
                          </Route>

                          <Route path={"/utilities"}>
                            <Route
                              path={"/utilities/locator/"}
                              element={<Locator />}
                            ></Route>
                            <Route path={"*"} element={<Error404 />}></Route>
                          </Route>
                        </Route>

                        <Route path={"/miscellaneous/"}>
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
                          <Route path={"*"} element={<Error404 />}></Route>
                        </Route>

                        <Route
                          path={"/:module/:form/:id"}
                          element={<DataController />}
                        ></Route>

                        <Route path={"*"} element={<Error404 />}></Route>
                      </Routes>
                    }
                  />
                }
              >
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
            ) : loggeduser.UserType === "Admin" ? (
              <Route
                path={"*"}
                element={
                  <MainLayout
                    usericon={info.icons.hiddenuser}
                    helpicon={info.icons.help}
                    menuicon={info.icons.menu}
                    logout={handleLogout}
                    user={`${loggeduser.LastName}, ${loggeduser.FirstName}`}
                    content={
                      <Routes>
                        <Route index element={<Dashboard />}></Route>
                        <>
                          {loggeduser.PermissionLevel >= 0 ? (
                            <>
                              <Route
                                path={"/a"}
                                element={<h1>Hello 2</h1>}
                              ></Route>
                              <Route
                                path={"/e"}
                                element={<h1>Hello 25</h1>}
                              ></Route>
                            </>
                          ) : null}
                        </>
                        <>
                          {loggeduser.PermissionLevel >= 1 ? (
                            <>
                              <Route
                                path={"/b"}
                                element={<h1>Hello 2</h1>}
                              ></Route>
                              <Route
                                path={"/d"}
                                element={<h1>Hello 3</h1>}
                              ></Route>
                            </>
                          ) : null}
                        </>
                        <>
                          {loggeduser.PermissionLevel >= 2 ? (
                            <Route
                              path={"/c"}
                              element={<h1>Hello 3</h1>}
                            ></Route>
                          ) : null}
                        </>
                      </Routes>
                    }
                  />
                }
              >
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
            ) : loggeduser.UserType === "User" ? (
              <Route path={"*"}>
                <Route path={"/*"} element={<Error404 />}></Route>
              </Route>
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
            <Route path={"*"} element={<Homepage />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/*"} element={<Error404 />}></Route>
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
