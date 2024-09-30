import React from "react";
import { Link } from "react-router-dom";

export class Error404 extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex justify-content-center align-items-center">
        <main>
          <h1 className="fw-extrabold">Error 404</h1>
          <p>The page you are trying to access does not exist.</p>
          <Link to={-1} className="btn btn-primary">
            Back
          </Link>
        </main>
      </main>
    );
  }
}
