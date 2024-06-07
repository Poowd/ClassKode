import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Dashboard } from "./pages/private/Dashboard";
import { NoDisplay } from "./component/placeholder/NoDisplay";
import { Error404 } from "./component/placeholder/Error404";
import { Department } from "./pages/private/Department";
import { Curriculum } from "./pages/private/Curriculum";

function App() {
  const navigate = useNavigate();
  //Initialize States / Variables
  const [userdetails, setUserDetails] = useState({
    Auth: true,
    ID: "01",
    User: "Powd_",
    UserLevel: "Manager",
  });

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // Simulate an API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

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

  return (
    <main>
      {/* Loading Screen */}
      {/* <header>{isLoading ? <FullscreenLoader /> : ""}</header> */}
      <MainLayout
        content={
          <Routes>
            {userdetails.Auth ? (
              <>
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
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/institution/course"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/institution/section"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/institution/room"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/institution/coach"}
                        element={<NoDisplay />}
                      ></Route>
                    </Route>
                    <Route path={"/utilities"}>
                      <Route
                        path={"/utilities/curriculum"}
                        element={<Curriculum />}
                      ></Route>
                      <Route
                        path={"/utilities/academicyear"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/utilities/schedule"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/utilities/locator"}
                        element={<NoDisplay />}
                      ></Route>
                    </Route>
                    <Route path={"/miscelleneous"}>
                      <Route
                        path={"/miscelleneous/archives"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/miscelleneous/logs"}
                        element={<NoDisplay />}
                      ></Route>
                      <Route
                        path={"/miscelleneous/users"}
                        element={<NoDisplay />}
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
