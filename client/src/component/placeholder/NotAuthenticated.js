import React from "react";
import { Link } from "react-router-dom";

export class NotAuthenticated extends React.Component {
  render() {
    return (
      <main
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <main>
          <h1>Not Authenticated</h1>
          <p>You are not authenticated</p>
          <Link to={"/login"} className="btn primary-gradient">
            Login
          </Link>
        </main>
      </main>
    );
  }
}
