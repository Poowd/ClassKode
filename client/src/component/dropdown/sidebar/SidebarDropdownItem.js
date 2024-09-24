import React from "react";
import { Link } from "react-router-dom";

export class SidebarDropdownItem extends React.Component {
  render() {
    return (
      <li className="w-100">
        <button className="text-start btn py-0 m-0 d-flex align-items-center">
          <span className="fs-3">{this.props.icon}</span>
          <Link to={this.props.navigate} className="w-100 nav-link px-3 py-2">
            <span className="text-dark">
              {this.props.text}
            </span>
          </Link>
        </button>
      </li>
    );
  }
}
