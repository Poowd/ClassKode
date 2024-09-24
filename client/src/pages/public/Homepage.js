import "../../App.css";
import React from "react";
import { Link } from "react-router-dom";
import "../../css/CustomColours.css";
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (1).png";
import useConfiguration from "../../hook/useConfiguration";

export function Homepage() {
  const [info] = useConfiguration();
  return (
    <main className="row vh-100 overflow-y-auto">
      <nav className="navbar navbar-expand-lg gradient-background-1 text-white d-flex justify-content-between px-5">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Class Kode
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
                  <Link
                    to={"/login"}
                    className="btn solid-background-1 btn-sm rounded-pill px-4"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </main>
          </div>
        </div>
      </nav>
      <main>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={info.details.carousel.item1.Image}
                className="d-block w-100 object-fit-cover"
                style={{ height: "85vh" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={info.details.carousel.item2.Image}
                className="d-block w-100 object-fit-cover"
                style={{ height: "85vh" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={info.details.carousel.item3.Image}
                className="d-block w-100 object-fit-cover"
                style={{ height: "85vh" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <main className="container my-5 py-5">
          <section>
            <main className="row m-0 p-0">
              <section className="col-6 p-3 m-0">
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
              <main className="row m-0 p-0">
                <section className="col-6 p-0 m-0">
                  <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      className="w-50 ratio ratio-1x1"
                      src={info.details.content.content2.Image}
                      alt="..."
                    />
                  </figure>
                </section>
                <section className="col-6 p-0 m-0">
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
              <main className="row m-0 p-0">
                <section className="col-6 p-3 m-0">
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
              <header className="w-100 text-center mb-3">
                <h1 className="fw-bold text-3xl">The Team</h1>
              </header>
              <main>
                <ul className="d-lg-flex justify-content-center gap-5">
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
              <main className="row m-0 p-0">
                <section className="col-6 p-0 m-0">
                  <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      className="w-50 ratio ratio-1x1"
                      src={info.details.content.content4.Image}
                      alt="..."
                    />
                  </figure>
                </section>
                <section className="col-6 p-0 m-0">
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
              <header className="w-100 text-center mb-3">
                <h1 className="fw-bold text-3xl">Special Thanks</h1>
              </header>
              <main>
                <ul className="d-lg-flex justify-content-center gap-5">
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
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
            <div className="col mb-3">
              <img className="w-50" src={logo} alt="..."></img>
              <p className="text-white">© 2024</p>
            </div>

            <div className="col mb-3"></div>

            <div className="col mb-3">
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

            <div className="col mb-3">
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

            <div className="col mb-3">
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
