import React from "react";

export class DefaultDropdown extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.reversed
            ? "d-flex align-items-center justify-content-center flex-row-reverse"
            : "d-flex align-items-center justify-content-center"
        }
      >
        <button
          className={
            "btn btn-sm d-flex align-items-center justify-content-center gap-2 p-2 " +
            this.props.class
          }
          type={"button"}
          disabled={this.props.disabled}
          data-bs-toggle={"dropdown"}
          data-bs-target={this.props.target}
          data-bs-dismiss={this.props.dismiss}
        >
          {this.props.icon}
        </button>
        {this.props.text != null ? (
          <small>
            <span className="fw-semibold text-decoration-underline">
              {this.props.text}
            </span>
          </small>
        ) : (
          ""
        )}
        <ul class="dropdown-menu">{this.props.dropdownitems}</ul>
      </div>
    );
  }
}
