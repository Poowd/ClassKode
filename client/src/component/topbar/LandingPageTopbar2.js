import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "../button/NavLink";

export function LandingPageTopbar2() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg gradient-background-1 top-0 start-0 z-2 w-100 text-white d-flex justify-content-between px-5">
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
            <ul className="navbar-nav gap-2">
              <NavLink to="/" text="Home" />
              <NavLink to="/about" text="About" />
              <NavLink to="/features" text="Features" />
              <NavLink to="/team" text="Team" />
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
  );
}
