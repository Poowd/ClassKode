import "../../App.css";
import React from "react";
import { Link } from "react-router-dom";
import "../../css/CustomColours.css";
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (3).png";
import mainlogo from "../../../src/assets/imgs/logo/ClassKode Logo (1).png";
import useConfiguration from "../../hook/useConfiguration";
import { LinkButton } from "../../component/button/LinkButton";
import { LoginCanvas } from "./LoginCanvas";
import { DefaultButton } from "../../component/button/DefaultButton";
import reader from "../../assets/imgs/misc/owie.png";

export function Homepage() {
  const [info] = useConfiguration();
  return (
    <main className="h-100 overflow-y-auto my-0 py-0 position-relative">
      <nav className="navbar navbar-expand-lg position-absolute top-0 start-0 z-2 w-100 text-white d-flex justify-content-between px-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h5 className="fs-4 fw-bold gradient-text-golden">Class Kode</h5>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <main className="w-100 d-lg-flex justify-content-end gap-3 align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active text-white"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    aria-current="page"
                    href="#"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    aria-current="page"
                    href="#"
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    aria-current="page"
                    href="#"
                  >
                    Team
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li>
                  {/* <LinkButton
                    to={"/login"}
                    textclass="btn-warning text-dark px-3 py-2 rounded-pill fw-bold"
                    text={"Login"}
                  /> */}
                </li>
              </ul>
            </main>
          </div>
        </div>
      </nav>
      <main className="overflow-hidden">
        <main className="w-100 tinted-black" style={{ height: "70vh" }}>
          <section className="container w-100 h-100 d-flex gap-5 align-items-center justify-content-center">
            <figure>
              <img
                src={mainlogo}
                className="ratio ratio-1x1"
                style={{ height: "15em", width: "15em" }}
              />
            </figure>
            <main>
              <section className="gradient-text-golden">
                <h3 className="m-0 fw-semibold">
                  <span>STI College</span>
                </h3>
                <h1 className="m-0 fw-bold display-3">
                  <span>Munoz-EDSA</span>
                </h1>
              </section>
            </main>
          </section>
        </main>
        {/* Content */}
        <main className="container my-5">
          <section className="p-3 position-relative">
            <main
              className="w-100 rounded shadow-sm d-flex gap-2 align-items-center"
              style={{ height: "10em", backgroundColor: "#FBFBF9" }}
            >
              <figure>
                <img
                  src={reader}
                  className="ratio ratio-1x1"
                  style={{ height: "15em", width: "15em" }}
                />
              </figure>
              <section>
                <h3 className="m-0 fw-bold gradient-text-blue-golden">
                  Welcome to Class Kode!
                </h3>
                <p className="m-0">
                  Login to utilize our Scheduling and Locator System.
                </p>
              </section>
            </main>
            <main className="position-absolute top-0 end-0 px-3">
              <section className="px-3">
                <DefaultButton
                  class="gradient-background-2 rounded px-5 py-3 z-3"
                  type="button"
                  text={<h6 className="m-0">Login</h6>}
                  icon={info.icons.navigation.back}
                  toggle="offcanvas"
                  target="#offcanvasExample"
                  function={() => {}}
                />

                {/* Off Canvas */}
                <div
                  class="offcanvas offcanvas-end login-off-canvas gradient-background-1"
                  tabindex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div class="offcanvas-header">
                    <DefaultButton
                      class="text-white"
                      type="button"
                      text="Back"
                      icon={info.icons.navigation.back}
                      dismiss="offcanvas"
                      function={() => {}}
                    />
                  </div>
                  <div class="offcanvas-body">
                    <LoginCanvas />
                  </div>
                </div>
                {/* Off Canvas */}
              </section>
            </main>
          </section>
          <section>
            <main className="row m-0 p-3">
              <section className="col-lg-6 p-3 m-0">
                <h1 className="fw-bold text-3xl">Class Scheduling</h1>
                <h3 className="fw-semibold text-md">
                  About the Web-Application
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </section>
              <section className="col-6 p-0 m-0">
                <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <img
                    className="w-50 ratio ratio-1x1"
                    src={info.details.content.content1.Image}
                    alt="..."
                  />
                </figure>
              </section>
            </main>
          </section>
        </main>
        <main className="gradient-background-1 text-white">
          <main className="container my-5 py-5">
            <section>
              <main className="row m-0 p-3">
                <section className="col-6 p-0 m-0">
                  <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      className="w-50 ratio ratio-1x1"
                      src={info.details.content.content2.Image}
                      alt="..."
                    />
                  </figure>
                </section>
                <section className="col-lg-6 p-0 m-0">
                  <h1 className="fw-bold text-3xl">Faculty Locator</h1>
                  <h3 className="fw-semibold text-md">
                    About the Web-Application
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </section>
              </main>
            </section>
          </main>
        </main>
        <main className="">
          <main className="container my-5 py-5">
            <section>
              <main className="row m-0 p-3">
                <section className="col-lg-6 p-3 m-0">
                  <h1 className="fw-bold text-3xl">About Team</h1>
                  <h3 className="fw-semibold text-md">
                    A Team of Passionate Members
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </section>
                <section className="col-6 p-0 m-0">
                  <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      className="w-50 ratio ratio-1x1"
                      src={info.details.content.content3.Image}
                      alt="..."
                    />
                  </figure>
                </section>
              </main>
            </section>
          </main>
        </main>
        <main className="">
          <main className="container my-5 py-5">
            <section>
              <main>
                <header className="w-100 text-center mb-5">
                  <h1 className="fw-bold text-3xl">The Team</h1>
                </header>
                <ul className="d-flex flex-wrap justify-content-center gap-5">
                  {info &&
                    info.details.dev_team.map((item, i) => (
                      <li
                        key={i}
                        className="d-flex flex-column align-items-center"
                      >
                        <figure
                          className="ratio ratio-1x1 rounded object-fit-cover"
                          style={{ width: "10em" }}
                        >
                          <img
                            className="object-fit-cover object-position-top rounded"
                            style={{ objectPosition: "top" }}
                            src={item.Image}
                            alt="..."
                          ></img>
                        </figure>
                        <h6>{item.Name}</h6>
                        <p>{item.Role}</p>
                      </li>
                    ))}
                </ul>
              </main>
            </section>
          </main>
        </main>
        <main className="gradient-background-1 text-white">
          <main className="container my-5 py-5">
            <section>
              <main className="row m-0 p-3">
                <section className="col-6 p-0 m-0">
                  <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      className="w-50 ratio ratio-1x1"
                      src={info.details.content.content4.Image}
                      alt="..."
                    />
                  </figure>
                </section>
                <section className="col-lg-6 p-0 m-0">
                  <h1 className="fw-bold text-3xl">STI College Muñoz-EDSA</h1>
                  <h3 className="fw-semibold text-md">The Host Company</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </section>
              </main>
            </section>
          </main>
        </main>
        <main className="">
          <main className="container my-5 py-5">
            <section>
              <header className="w-100 text-center mb-5">
                <h1 className="fw-bold text-3xl">Special Thanks</h1>
              </header>
              <main>
                <ul className="d-flex flex-wrap justify-content-center gap-5">
                  {info &&
                    info.details.special_thanks.map((item, i) => (
                      <li
                        key={i}
                        className="d-flex flex-column align-items-center"
                      >
                        <figure
                          className="ratio ratio-1x1"
                          style={{ width: "10em" }}
                        >
                          <img
                            className="object-fit-cover object-position-top rounded"
                            style={{ objectPosition: "top" }}
                            src={item.Image}
                            alt="..."
                          ></img>
                        </figure>
                        <h6>{item.Name}</h6>
                        <p>{item.Role}</p>
                      </li>
                    ))}
                </ul>
              </main>
            </section>
          </main>
        </main>
      </main>
      <main className="gradient-background-1 text-white">
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 px-lg-0 px-5 border-top">
            <div className="col mb-3">
              <img className="w-100" src={logo} alt="..."></img>
              <p className="text-white">© 2024</p>
            </div>

            <div className="col mb-3"></div>

            <div className="col-lg col-4 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg col-4 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg col-4 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </main>
  );
}
