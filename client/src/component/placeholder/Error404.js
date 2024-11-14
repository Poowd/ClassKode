import React from "react";
import { Link } from "react-router-dom";
import owie from "../../assets/imgs/misc/owie.png";

export class Error404 extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex justify-content-center align-items-center">
        <main className="row m-0 p-0">
          <section className="col-lg-6">
            <figure className="d-flex justify-content-center">
              <img src={owie} width={250} height={250} />
            </figure>
          </section>
          <section className="col-lg-6">
            <main className="h-100 d-flex flex-column justify-content-center">
              <h1 className="fw-extrabold">Error 404</h1>
              <p>The page you are trying to access does not exist.</p>
              <div className="d-flex gap-2">
                <Link to={-1} className="btn primary-gradient">
                  Back
                </Link>
                <Link to={"/"} className="btn primary-gradient">
                  Home
                </Link>
              </div>
            </main>
          </section>
        </main>
      </main>
    );
  }
}
