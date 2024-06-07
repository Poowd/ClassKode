import React from "react";

export class SidebarDropdown extends React.Component {
  render() {
    return (
      <li>
        <a
          href={this.props.reference}
          data-bs-toggle="collapse"
          className="nav-link px-lg-0 align-middle"
        >
          <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
            {this.props.text}
          </span>
        </a>

        <ul
          className="collapse nav flex-column px-3"
          id={this.props.referenced}
          data-bs-parent={this.props.parent}
        >
          {this.props.itemlist}
        </ul>
      </li>
    );
  }
}
