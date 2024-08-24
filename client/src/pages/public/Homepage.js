import "../../App.css";
import React from "react";
import { Link } from "react-router-dom";
import "../../css/CustomColours.css";

export function Homepage() {
  return (
    <main>
      <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="me-2">
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        </div>
      </nav>
      <main>
        <div
          id="carouselExampleAutoplaying"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://i.redd.it/rfftqdg5flv71.jpg"
                class="d-block w-100 object-fit-cover"
                style={{ height: "75vh" }}
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://i.etsystatic.com/37329949/r/il/9e549c/4577220058/il_fullxfull.4577220058_fww3.jpg"
                class="d-block w-100 object-fit-cover"
                style={{ height: "75vh" }}
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://i.imgur.com/JnJ8emx.png"
                class="d-block w-100 object-fit-cover"
                style={{ height: "75vh" }}
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <main className="container my-5">
          <section>
            <h3>About Class Kode</h3>
            <main className="row m-0 p-0">
              <section className="col-6 p-0 m-0">a</section>
              <section className="col-6 p-0 m-0">a</section>
            </main>
          </section>
        </main>
        <main className="container my-5">
          <section>
            <h3>About the Team</h3>
            <main className="row m-0 p-0">
              <section className="col-6 p-0 m-0">a</section>
              <section className="col-6 p-0 m-0">a</section>
            </main>
          </section>
        </main>
        <main className="container my-5">
          <section>
            <h3>The Team</h3>
            <main className="row m-0 p-0">
              <section className="col p-0 m-0">a</section>
              <section className="col p-0 m-0">a</section>
              <section className="col p-0 m-0">a</section>
              <section className="col p-0 m-0">a</section>
              <section className="col p-0 m-0">a</section>
            </main>
          </section>
        </main>
        <main className="container my-5">
          <section>
            <h3>Message from Head Developer</h3>
            <main className="row m-0 p-0">
              <section className="col-12 p-0 m-0">a</section>
            </main>
          </section>
        </main>
        <main className="container my-5">
          <section>
            <h3>Special Thanks</h3>
            <main className="row m-0 p-0">
              <section className="col-4 p-0 m-0">a</section>
              <section className="col-4 p-0 m-0">a</section>
              <section className="col-4 p-0 m-0">a</section>
            </main>
          </section>
        </main>
      </main>
      <div class="container">
        <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
          <div class="col mb-3">
            <p class="text-body-secondary">© 2024</p>
          </div>

          <div class="col mb-3"></div>

          <div class="col mb-3">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Features
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Pricing
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Features
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Pricing
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Home
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Features
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  Pricing
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
}
