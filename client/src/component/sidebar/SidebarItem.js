import React from "react";
import { Link } from "react-router-dom";

export class SidebarItem extends React.Component {
  render() {
    return (
      <li className="w-100 p-0 m-0">
        <button className={`text-start w-100 btn p-0 ${this.props.class}`}>
          <Link
            to={this.props.navigate}
            className={`nav-link ${this.props.classlink}`}
          >
            <span className="fs-5 px-2">{this.props.icon}</span>
            <span className="text-dark">{this.props.text}</span>
          </Link>
        </button>
      </li>
    );
  }
}
