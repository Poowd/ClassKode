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

export function Login() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [get, post, data_get, data_post] = useDatabase();
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

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
        console.log(data);
        if (data.Status === "Success") {
          sessionStorage.setItem("user", JSON.stringify(data.data));
          sessionStorage.setItem("loggedin", true);
          navigate("/"); //to dashboard
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
                    <DefaultInput
                      class="bg-light p-2"
                      type="password"
                      placeholder="Password"
                      trigger={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      name={"Password"}
                      required
                    />
                    <DefaultButton
                      class="btn-warning fw-bold text-dark mt-5 mb-3 w-100 p-2 rounded-pill"
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
        <main className="h-100 w-100 position-relative back-blur p-lg-5">
          <section className="position-absolute p-3 top-0 start-0">
            <img src={stiLogo} className="rounded" width="80" height="60" />
          </section>
          <section className="w-100 p-2 rounded position-absolute bottom-0 start-0 text-center text-white">
            <small>
              <span>
                Kindly read our <Link>TERMS AND POLICY</Link> to learn more
                about the school's policies.
              </span>
            </small>
          </section>
          <main className="h-100 w-75 position-relative mx-auto">
            <section className="d-none d-lg-block h-100 w-100 position-absolute p-3">
              <main className="h-100 w-100 bg-primary shadow-lg rounded p-2">
                <main className="h-100 w-100 local-campus-bg rounded"></main>
              </main>
            </section>
            <section className="h-100 w-100 d-flex justify-content-end position-absolute p-3">
              <section
                className="h-100 d-flex justify-content-end py-3 ps-0 pe-4"
                style={{ width: "60%" }}
              >
                <main className="h-100 w-100 position-relative  d-flex align-items-center">
                  <section className="position-absolute top-0 end-0">
                    <div className="d-flex justify-content-end">
                      <DefaultButton
                        class="text-white rounded-pill px-3 py-2"
                        type="button"
                        text="Back"
                        icon={info.icons.navigation.back}
                        function={() => navigate("/")}
                      />
                    </div>
                  </section>
                  <section className="position-absolute bottom-0 left-0">
                    <img
                      src={reader}
                      className="ratio ratio-1x1"
                      style={{ height: "15em" }}
                    />
                  </section>
                </main>
              </section>
            </section>
            <section className="h-100 w-75 position-absolute">
              <main className="h-100 w-50 gradient-background-1 shadow-lg border border-4 border-primary rounded">
                <form
                  onSubmit={handleSubmit}
                  autocomplete="off"
                  className="h-100 overflow-y-hidden"
                >
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
                        <DefaultInput
                          class="bg-light p-2"
                          type="password"
                          placeholder="Password"
                          trigger={(e) =>
                            setValues({ ...values, password: e.target.value })
                          }
                          name={"Password"}
                          required
                        />
                        <DefaultButton
                          class="btn-warning fw-bold text-dark mt-5 mb-3 w-100 p-2 rounded-pill"
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
        </main>
      </main>
    </>
  );
}
