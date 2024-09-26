import React from "react";

export class SidebarDropdown extends React.Component {
  render() {
    return (
      <section className="w-100 p-3 d-flex">
        <a
          href={this.props.reference}
          data-bs-toggle="collapse"
          aria-expanded="false"
          className="nav-link px-lg-0 align-middle w-100"
        >
          <span className="text-dark fw-medium">{this.props.text}</span>
        </a>

        <ul
          className="collapse collapse-horizontal flex-column gap-2"
          id={this.props.referenced}
          data-bs-parent={this.props.parent}
        >
          {this.props.itemlist}
        </ul>
      </section>
    );
  }
}
