import "../../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/CustomColours.css";
import stiLogo from "../../assets/imgs/logo/sti-logo.png";
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (3).png";
import mainlogo from "../../../src/assets/imgs/logo/ClassKode Logo (1).png";
import useConfiguration from "../../hook/useConfiguration";
import { LinkButton } from "../../component/button/LinkButton";
import { LoginCanvas } from "./LoginCanvas";
import { DefaultButton } from "../../component/button/DefaultButton";
import reader from "../../assets/imgs/misc/owie.png";
import { DefaultInput } from "../../component/input/DefaultInput";
import useDatabase from "../../hook/useDatabase";
import classkodelogo from "../../assets/imgs/logo/ClassKode Logo (1).png";

export function Register() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [values, setValues] = useState({
    email: "",
    academicCode: "",
    password: "",
  });
  const [password, setPassword] = useState(0);
  const [data, setData] = useState(null);
  const [academicYearCode, setAYCode] = useState([]);

  useEffect(() => {
    data_get("current-academic-year-code", setAYCode);
  }, []);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents normal function of onsubmit in forms
    try {
      const response = await fetch("http://localhost:8081/user-login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const entry = await response.json();
      try {
        setData(entry);
        if (entry.Status === "Success") {
          if (values.academicCode === academicYearCode.AcademicCode) {
            data_post(
              "user-registry",
              {
                SchoolID: entry.data.SCHLID,
                AcademicCode: values.academicCode,
              },
              setData
            );
            sessionStorage.setItem("user", JSON.stringify(entry.data));
            sessionStorage.setItem("loggedin", true);
            navigate("/"); //to dashboard
            //alert("Succcess");
          } else {
            alert("A problem occurred");
          }
        } else {
          alert("A problem occurred");
        }
      } catch (error) {}
    } catch (error) {}
  };

  //2SIMTbL
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
                function={() => navigate(-1)}
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
                <h1 className="fw-bold text-center mb-5">Re-Register Code</h1>
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
                      class="bg-light p-2 mb-3"
                      placeholder="Academic Code"
                      trigger={(e) =>
                        setValues({ ...values, academicCode: e.target.value })
                      }
                      name={"Academic Code"}
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
                      class="w-100 gradient-background-2 fw-bold text-dark mt-5 mb-3 py-3 px-5"
                      type="submit"
                      text={<h6 className="m-0">Login</h6>}
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
                          function={() => navigate(-1)}
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
                      <h3 className="fw-bold">Re-Register Code</h3>
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
                        <DefaultInput
                          class="bg-light p-2 mb-3"
                          placeholder="Academic Code"
                          trigger={(e) =>
                            setValues({
                              ...values,
                              academicCode: e.target.value,
                            })
                          }
                          name={"Academic Code"}
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
