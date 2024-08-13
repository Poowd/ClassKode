import React from "react";
import { Link } from "react-router-dom";

export class SidebarDropdownItem extends React.Component {
  render() {
    return (
      <li className="w-100">
        <button className="text-start w-100 btn py-0 m-0 d-flex align-items-center">
          {this.props.icon}
          <Link to={this.props.navigate} className="nav-link">
            <span className="d-none d-sm-inline text-dark">
              {this.props.text}
            </span>
          </Link>
        </button>
      </li>
    );
  }
}
