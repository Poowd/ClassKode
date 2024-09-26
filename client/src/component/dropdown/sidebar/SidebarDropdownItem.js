import React from "react";
import { Link } from "react-router-dom";

export class SidebarDropdownItem extends React.Component {
  render() {
    return (
      <li className="">
        <Link to={this.props.navigate} className="w-100">
          <button
            className="btn p-0 m-0 ratio ratio-1x1"
            style={{ width: "10em" }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <div className="d-flex flex-column align-items-center justify-content-center p-0 m-0">
              <div className="fs-1">{this.props.icon}</div>
              <div className="text-dark fw-semibold">{this.props.text}</div>
            </div>
          </button>
        </Link>
      </li>
    );
  }
}
