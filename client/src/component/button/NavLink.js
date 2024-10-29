import React from "react";
import { Link } from "react-router-dom";

export class NavLink extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <Link
          to={this.props.to}
          state={this.props.state}
          className={"nav-link text-white px-2"}
        >
          <span className="fw-semibold">{this.props.text}</span>
        </Link>
      </li>
    );
  }
}
