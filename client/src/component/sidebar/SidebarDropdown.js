import React from "react";

export class SidebarDropdown extends React.Component {
  render() {
    return (
      <li>
        <a
          href={this.props.reference}
          data-bs-toggle="collapse"
          className="nav-link px-lg-0 align-middle w-100 p-2"
        >
          <span className="fs-5 px-2">{this.props.icon}</span>
          <span className="fw-medium">{this.props.text}</span>
        </a>

        <ul
          className="collapse nav p-0"
          id={this.props.referenced}
          data-bs-parent={this.props.parent}
        >
          {this.props.itemlist}
        </ul>
      </li>
    );
  }
}
