import React from "react";
import { LuAlertCircle } from "react-icons/lu";

export class DashboardCardContent extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex flex-column justify-content-between p-3">
        <header className="d-flex justify-content-between align-items-center">
          <h5 className="p-0 m-0 fw-light">{this.props.title}</h5>
          <div>{this.props.button}</div>
        </header>
        <main>
          <h2 className="p-0 m-0 fw-bold">{this.props.content}</h2>
        </main>
        <small>
          <footer className="d-flex gap-1 align-items-center fw-semibold fw-light">
            <LuAlertCircle />
            <small>
              <p className="p-0 m-0 fw-light">Footer</p>
            </small>
          </footer>
        </small>
      </main>
    );
  }
}
