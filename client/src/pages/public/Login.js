import "../../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import stiLogo from "../../assets/imgs/logo/sti-logo.png";
import sticampus from "../../assets/imgs/background/sti-bg-campus-2.jpg";
import classkodelogo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import "../../css/CustomColours.css";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import { RiCloseFill } from "react-icons/ri";
import useDatabase from "../../hook/useDatabase";
import reader from "../../assets/imgs/misc/owie.png";
import useConfiguration from "../../hook/useConfiguration";
import useHandleChange from "../../hook/useHandleChange";

export function Login() {
  const dateObject = new Date();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState(0);
  const [get, post, data_get, data_post] = useDatabase();
  const [data, setData] = useState(null);
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);
  const [academicYearCode, setAYCode] = useState([]);
  const [logs, setLogs] = useState("");

  useEffect(() => {
    data_get("current-academic-year-code", setAYCode);
  }, []);

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const setCookies = (data) => {
    document.cookie = `accountCookies=${data};`;
  };

  //get the data from server, if the server response if success -- login
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents normal function of onsubmit in forms
    try {
      const response = await fetch("http://localhost:8081/user-login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      try {
        setData(data);
        if (data.Status === "Success") {
          //check if account is existing first
          if (data.data.AcademicCode === academicYearCode.AcademicCode) {
            //test wether if that account has academic code
            sessionStorage.setItem("user", JSON.stringify(data.data));
            sessionStorage.setItem("loggedin", true);
            data_post(
              "log-me",
              {
                Action: "Login",
                Module: "Login Module",
                User: data.data.SCHLID,
                Details: "A User has Logged-In",
                Date: `${dateObject.getMonth()}-${dateObject.getDate()}-${dateObject.getFullYear()}`,
                Time: `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`,
              },
              setLogs
            );
            setCookies(JSON.stringify(data.data));
            navigate("/");
            window.location.reload(true);
          } else {
            navigate("/register");
          }
        } else {
          alert(data.Status === undefined ? "A problem occurred" : data.Status);
        }
      } catch (error) {}
    } catch (error) {}
  };

  return (
    <>
      <main className="vh-100 d-block d-lg-none">
        <section className="h-100 w-100 gradient-background-1 p-5 position-relative overflow-y-auto">
          <section className="position-absolute p-5 top-0 end-0">
            <div className="d-flex justify-content-end">
              <DefaultButton
                class="text-white"
                type="button"
                text="Back"
                icon={info.icons.navigation.back}
                function={() => navigate("/")}
              />
            </div>
          </section>
          <main className="h-100 w-100 p-5">
            <form onSubmit={handleSubmit} autoComplete="off" className="h-100">
              <div className="h-100 px-lg-5 rounded d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                  <img
                    className="w-100 drop-shadow-lg px-5 py-0"
                    src={classkodelogo}
                    alt="..."
                  ></img>
                </div>
                <h1 className="fw-bold text-center mb-5">Login</h1>
                <div className="w-100">
                  <div className="w-100 px-lg-3">
                    <DefaultInput
                      class="bg-light p-2 mb-3"
                      placeholder="Email"
                      trigger={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      name={"Email"}
                      required
                    />
                    <main className="d-flex bg-white rounded">
                      <DefaultInput
                        class="bg-light p-2 border-0"
                        type={password === 0 ? "password" : "text"}
                        placeholder="Password"
                        trigger={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        name={"Password"}
                        required
                      />
                      <DefaultButton
                        class="px-3 text-dark border-0"
                        type="button"
                        icon={info.icons.others.hiddenuser}
                        function={() => {
                          password === 0 ? setPassword(1) : setPassword(0);
                        }}
                      />
                    </main>
                    <DefaultButton
                      class="btn-warning fw-bold text-dark mt-5 mb-3 w-100 p-3 rounded-pill"
                      type="submit"
                      text="Login"
                    />
                  </div>
                </div>
                <p className="w-100 m-0 d-flex gap-3 justify-content-center">
                  <span>
                    <Link to={"/termspolicy"} className="text-light">
                      Forgot Password
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </main>
        </section>
      </main>
      <main className="d-none d-lg-block vh-100 position-relative login-background">
        <main className="h-100 w-100 position-relative back-blur p-lg-5 d-flex justify-content-center">
          <main className="h-100 w-75 position-relative d-flex justify-content-center">
            <section className="h-100 w-75 position-absolute d-flex justify-content-center">
              <main className="h-100 w-50 gradient-background-1 shadow-lg border border-4 border-primary rounded">
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="h-100"
                >
                  <div className="h-100 px-lg-5 rounded d-flex flex-column justify-content-center position-relative">
                    <section className="position-absolute top-0 end-0">
                      <div className="d-flex justify-content-end m-3">
                        <DefaultButton
                          class="text-white rounded-pill px-3 py-2"
                          type="button"
                          text="Back"
                          icon={info.icons.navigation.back}
                          function={() => navigate("/")}
                        />
                      </div>
                    </section>
                    <div className="d-flex justify-content-center mb-3">
                      <img
                        className="w-100 drop-shadow-lg px-5 py-0"
                        src={classkodelogo}
                        alt="..."
                      ></img>
                    </div>
                    <div className="w-100 px-lg-3">
                      <h3 className="fw-bold">Login</h3>
                      <div className="w-100">
                        <DefaultInput
                          class="bg-light p-2 mb-3"
                          placeholder="Email"
                          trigger={(e) =>
                            setValues({ ...values, email: e.target.value })
                          }
                          name={"Email"}
                          required
                        />
                        <main className="d-flex bg-white rounded">
                          <DefaultInput
                            class="bg-light p-2 border-0"
                            type={password === 0 ? "password" : "text"}
                            placeholder="Password"
                            trigger={(e) =>
                              setValues({ ...values, password: e.target.value })
                            }
                            name={"Password"}
                            required
                          />
                          <DefaultButton
                            class="px-3 text-dark border-0"
                            type="button"
                            icon={info.icons.others.hiddenuser}
                            function={() => {
                              password === 0 ? setPassword(1) : setPassword(0);
                            }}
                          />
                        </main>
                        <main className="d-flex align-items-center gap-2 mt-4">
                          <DefaultButton
                            class="gradient-background-2 fw-bold text-dark py-2 px-5"
                            type="submit"
                            text={<h6 className="m-0">Login</h6>}
                          />
                          <Link to={"/termspolicy"} className="text-light btn">
                            Forgot Password
                          </Link>
                        </main>
                      </div>
                    </div>
                  </div>
                </form>
              </main>
            </section>
          </main>
        </main>
      </main>
    </>
  );
}
