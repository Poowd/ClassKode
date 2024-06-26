import React from "react";
import { DefaultButton } from "../../button/DefaultButton";
import { LuAlertCircle } from "react-icons/lu";

export class DashboardCardContent extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex flex-column justify-content-between p-3 border-start border-5 border-info">
        <header className="d-flex justify-content-between align-items-center">
          <h5 className="p-0 m-0 fw-bold text-secondary">{this.props.title}</h5>
          <div>{this.props.button}</div>
        </header>
        <main>
          <h3 className="p-0 m-0 fw-bold">{this.props.content}</h3>
        </main>
        <small>
          <footer className="d-flex gap-1 align-items-center fw-semibold text-body-tertiary">
            <LuAlertCircle />
            <p className="p-0 m-0">Footer</p>
          </footer>
        </small>
      </main>
    );
  }
}
