import "../../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import stiLogo from "../../assets/imgs/logo/sti-logo.png";
import sticampus from "../../assets/imgs/background/sti-bg-campus.jpg";
import classkodelogo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import "../../css/CustomColours.css";
import { DefaultInput } from "../../component/input/DefaultInput";
import { DefaultButton } from "../../component/button/DefaultButton";
import { RiCloseFill } from "react-icons/ri";
import useDatabase from "../../hook/useDatabase";

export function Login() {
  const navigate = useNavigate();
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
    data_post("user-login", values, setData);
    try {
      if (data.Status === "Success") {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        sessionStorage.setItem("loggedin", true);
        navigate("/"); //to dashboard
      } else {
        alert(data.Status === undefined ? "A problem occurred" : data.Status);
      }
    } catch (error) {
      alert("A Problem Occurred");
    }
  };

  return (
    <>
      <main className="Login row vh-100 overflow-y-auto">
        <section
          className="col-lg-8 h-100 text-white"
          style={{
            backgroundImage: "url(" + sticampus + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-5 row h-100 py-5 d-flex flex-column justify-content-between">
            <div className="d-flex gap-3">
              <img src={stiLogo} className="rounded" width="80" height="60" />
              <div>
                <h5 className="p-0 fw-bold">STI College</h5>
                <p className="fw-light">Munoz - EDSA, Quezon City</p>
              </div>
            </div>
            <div>
              <p className="m-0 p-0">
                <span className="me-1">© 2024 Puzzi</span>
                <span className="d-block">
                  Bachelor of Science in Computer Science
                </span>
              </p>
            </div>
          </div>
        </section>
        <section
          className="col-lg-4 h-100 d-flex flex-column justify-content-center p-5 text-white gradient-bg-blue"
          // style={{ backgroundColor: "#2c384a" }}
        >
          <form
            onSubmit={handleSubmit}
            autocomplete="off"
            className="overflow-y-hidden"
          >
            <div className="px-lg-5 border border-light rounded py-5 border-secondary">
              <div className="d-flex justify-content-end">
                <DefaultButton
                  class="btn-outline-light"
                  type="button"
                  icon={<RiCloseFill />}
                  function={() => navigate("/")}
                />
              </div>
              <div className="d-flex justify-content-center">
                <img
                  className="w-75 px-5 py-0"
                  src={classkodelogo}
                  alt="..."
                ></img>
              </div>
              <h1 className="fw-bold text-center mb-5">Login</h1>
              <div className="w-100">
                <div className="w-100 px-lg-5">
                  <DefaultInput
                    class="bg-transparent p-2 custom-text-cyan mb-3"
                    placeholder="Email"
                    trigger={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    name={"Email"}
                    required
                  />
                  <DefaultInput
                    class="bg-transparent p-2 custom-text-cyan"
                    type="password"
                    placeholder="Password"
                    trigger={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    name={"Password"}
                    required
                  />
                  <DefaultButton
                    class="btn-primary my-3 w-100 p-3"
                    type="submit"
                    text="Login"
                  />
                </div>
              </div>
              <p className="w-100 my-3 d-flex gap-3 justify-content-center">
                <span>
                  <Link to={"/termspolicy"} className="text-light">
                    Terms & Policy
                  </Link>
                </span>
                <span>|</span>
                <span>
                  <Link to={"/termspolicy"} className="text-light">
                    Contact MIS
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
