import React from "react";

export class SidebarDropdown extends React.Component {
  render() {
    return (
      <section className="w-100">
        <a
          href={this.props.reference}
          data-bs-toggle="collapse"
          className="nav-link px-lg-0 align-middle w-100"
        >
          <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
            {this.props.text}
          </span>
        </a>

        <ul
          className="collapse nav flex-column px-3 w-100"
          id={this.props.referenced}
          data-bs-parent={this.props.parent}
        >
          {this.props.itemlist}
        </ul>
      </section>
    );
  }
}
