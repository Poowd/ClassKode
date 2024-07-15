import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Form } from "react-router-dom";
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
import {
  DataController,
  DataForms,
} from "./pages/private/forms/DataController";
import { RoomSchedule } from "./pages/private/utilities/schedule/RoomSchedule";
import { SectionSchedule } from "./pages/private/utilities/schedule/SectionSchedule";
import { CoachAssignment } from "./pages/private/utilities/academicyear/CoachAssignment";
import { SectionProjection } from "./pages/private/utilities/academicyear/SectionProjection";
import { CourseSetup } from "./pages/private/utilities/curriculum/CourseSetup";
import { FullscreenLoader } from "./component/loader/FullscreenLoader";
import { BackgroundColours } from "./pages/components/BackgroundColours";

function App() {
  const navigate = useNavigate();
  //Initialize States / Variables
  const [userdetails, setUserDetails] = useState({
    Auth: true,
    ID: "01",
    User: "Powd_",
    UserLevel: "Manager",
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  //Get Authentication from the Server
  // useEffect(() => {
  //   axios.get("http://localhost:8081").then((res) => {
  //     if (res.data.Status === "Success") {
  //       setUserDetails({
  //         Auth: true,
  //         UUID: res.data.UUID,
  //         Name: res.data.Name,
  //         UserType: res.data.UserType,
  //       });
  //     } else {
  //       setUserDetails({
  //         Auth: false,
  //         UUID: "",
  //         Name: "",
  //       });
  //     }
  //   });
  // }, [userdetails.Message]);

  //Remove your Token / Cookies -- Logging Out an Account
  // const handleLogout = () => {
  //   axios
  //     .post("http://localhost:8081/logout")
  //     .then((res) => {
  //       if (res.data.Status === "Success") {
  //         window.location.reload(true);
  //       } else {
  //         alert("Error");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //Detect wether the Tab is Closing
  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   e.returnValue = "";
  // });

  return (
    <main>
      {/* Loading Screen */}
      <header>{isLoading ? <FullscreenLoader /> : ""}</header>
      <MainLayout
        content={
          <Routes>
            {userdetails.Auth ? (
              <>
                <Route
                  path="/testing/bgcolour"
                  element={<BackgroundColours />}
                ></Route>
                {userdetails.UserLevel === "Manager" ? (
                  <Route path={"/"}>
                    <Route path={"/"} element={<Dashboard />}></Route>
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
                      {/* a */}
                      <Route
                        path={"/institution/:module/:form/:id"}
                        element={<DataController />}
                      ></Route>
                    </Route>
                    <Route path={"/utilities"}>
                      <Route path={"/utilities/curriculum"}>
                        <Route
                          path={"/utilities/curriculum/"}
                          element={<Curriculum />}
                        ></Route>
                        <Route
                          path={"/utilities/curriculum/setup"}
                          element={<CourseSetup />}
                        ></Route>
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
                    <Route path={"/*"} element={<Error404 />}></Route>
                  </Route>
                ) : userdetails.UserLevel === "Admin" ? (
                  <Route path={"/admin"}></Route>
                ) : userdetails.UserLevel === "User" ? (
                  <Route path={"/user"}></Route>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <Route path={"/"} element={"not authenticated"}></Route>
              </>
            )}
          </Routes>
        }
      />
    </main>
  );
}

export default App;
