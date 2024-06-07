import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";

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
      <main>
        <Routes>
          {userdetails.Auth ? (
            <>
              {userdetails.UserLevel === "Manager" ? (
                <Route path={"/"}>
                  <Route path={"/"} element={<MainLayout />}></Route>
                  <Route path={"/institution"}>
                    <Route
                      path={"/institution/department"}
                      element={"department"}
                    ></Route>
                    <Route
                      path={"/institution/program"}
                      element={"program"}
                    ></Route>
                    <Route
                      path={"/institution/course"}
                      element={"course"}
                    ></Route>
                    <Route
                      path={"/institution/section"}
                      element={"section"}
                    ></Route>
                    <Route path={"/institution/room"} element={"room"}></Route>
                    <Route
                      path={"/institution/coach"}
                      element={"coach"}
                    ></Route>
                  </Route>
                  <Route path={"/utilities"}>
                    <Route
                      path={"/utilities/class schedule"}
                      element={"class schedule"}
                    ></Route>
                    <Route
                      path={"/utilities/faculty locator"}
                      element={"faculty locator"}
                    ></Route>
                  </Route>
                  <Route path={"/miscelleneous"}>
                    <Route
                      path={"/miscelleneous/archives"}
                      element={"archives"}
                    ></Route>
                    <Route
                      path={"/miscelleneous/logs"}
                      element={"logs"}
                    ></Route>
                    <Route
                      path={"/miscelleneous/users"}
                      element={"users"}
                    ></Route>
                  </Route>
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
      </main>
    </main>
  );
}

export default App;
