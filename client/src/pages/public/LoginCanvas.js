import "../../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classkodelogo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import "../../css/CustomColours.css";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import useDatabase from "../../hook/useDatabase";
import useConfiguration from "../../hook/useConfiguration";
import useHandleChange from "../../hook/useHandleChange";
import { FormInput } from "../../component/input/FormInput";

export function LoginCanvas() {
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

  useEffect(() => {
    data_get("current-academic-year-code", setAYCode);
  }, []);

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
        if (data.Status === "Success") {
          //check if account is existing first
          if (data.data.AcademicCode === academicYearCode.AcademicCode) {
            //test wether if that account has academic code
            sessionStorage.setItem("user", JSON.stringify(data.data));
            sessionStorage.setItem("loggedin", true);
            navigate("/");
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
      <main className="h-100 d-block">
        <section className="h-100 w-100 p-5 position-relative overflow-y-auto">
          <main className="h-100 w-100 p-2">
            <form onSubmit={handleSubmit} autoComplete="off" className="h-100">
              <div className="h-100 px-lg-5 rounded d-flex flex-column justify-content-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    className="w-100 drop-shadow-lg px-5 py-0"
                    src={classkodelogo}
                    alt="..."
                  ></img>
                  <h1 className="fw-bold text-center mb-5">Login</h1>
                </div>
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
    </>
  );
}
