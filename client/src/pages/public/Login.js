import "../../App.css";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import classkodelogo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import "../../css/CustomColours.css";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import useDatabase from "../../hook/useDatabase";
import useConfiguration from "../../hook/useConfiguration";
import useHandleChange from "../../hook/useHandleChange";
import useModal from "../../hook/useModal";
import { StatusModal } from "../../component/modal/StatusModal";
import { useLogs } from "../../hook/useLogs";

export function Login() {
  const dateObject = new Date();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [recordLog] = useLogs();
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
            recordLog("Login", "Login Module", "A User has Logged-In");
            setCookies(JSON.stringify(data.data));
            window.location.assign("/");
          } else {
            navigate("/register");
          }
        } else {
          showModal(
            "StatusModal",
            "",
            <main className="d-flex flex-column">
              <section className="text-center">
                <h1 className="danger-text">{info.icons.status.danger}</h1>
                <h3 className="danger-text fw-bold">Login Failed</h3>
                <p className="text-secondary">
                  {data.Status === undefined
                    ? "A problem occurred"
                    : data.Status}
                </p>
                <button
                  type="button"
                  class="btn danger-color mt-3"
                  data-bs-dismiss="modal"
                >
                  Okay
                </button>
              </section>
            </main>
          );
        }
      } catch (error) {}
    } catch (error) {}
  };

  return (
    <>
      <main className="vh-100 d-block d-lg-none">
        <section className="h-100 w-100 primary-gradient p-5 position-relative overflow-y-auto">
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
                        class="px-3 border-0"
                        type="button"
                        icon={info.icons.others.hiddenuser}
                        function={() => {
                          password === 0 ? setPassword(1) : setPassword(0);
                        }}
                      />
                    </main>
                    <small>
                      <p className="m-0 d-flex gap-3 justify-content-end mt-2">
                        <Link
                          to={"https://www.stimunoz.edu.ph/contact-us/"}
                          target="_blank"
                          className="text-light"
                        >
                          Forgot Password?
                        </Link>
                      </p>
                    </small>
                    <main className="mt-4">
                      <DefaultButton
                        class="w-75 warning-color fw-bold text-dark py-2 mx-auto"
                        type="submit"
                        text={"Login"}
                      />
                    </main>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </section>
      </main>
      <main className="d-none d-lg-block vh-100 position-relative login-background">
        <main className="h-100 w-100 position-relative back-blur p-lg-5 d-flex justify-content-center">
          <main className="h-100 w-75 position-relative d-flex justify-content-center">
            <section className="h-100 w-75 position-absolute d-flex justify-content-center">
              <main className="h-100 w-50 primary-gradient shadow-lg border border-4 border-primary rounded">
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
                        <small>
                          <p className="m-0 d-flex gap-3 justify-content-end mt-2">
                            <Link
                              to={"https://www.stimunoz.edu.ph/contact-us/"}
                              target="_blank"
                              className="text-light"
                            >
                              Forgot Password?
                            </Link>
                          </p>
                        </small>
                        <main className="mt-4">
                          <DefaultButton
                            class="w-75 warning-color fw-bold text-dark py-2 mx-auto"
                            type="submit"
                            text={<h6 className="m-0">Login</h6>}
                          />
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
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main>{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
    </>
  );
}
