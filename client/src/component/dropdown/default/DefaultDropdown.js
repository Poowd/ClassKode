import React from "react";
import "../Dropdown.css";

export class DefaultDropdown extends React.Component {
  render() {
    return (
      <button
        className={
          "btn btn-sm d-flex align-items-center justify-content-center gap-2 p-1 " +
          this.props.class
        }
        type={"button"}
        disabled={this.props.disabled}
        data-bs-toggle={"dropdown"}
        data-bs-target={this.props.target}
        data-bs-dismiss={this.props.dismiss}
      >
        {" "}
        <div
          className={
            this.props.reversed
              ? "d-flex align-items-center justify-content-center flex-row-reverse gap-2"
              : "d-flex align-items-center justify-content-center gap-2"
          }
        >
          {this.props.icon}
          {this.props.text != null ? (
            <small className="p-0 m-0">
              <span className="button-text fw-semibold text-decoration-underline p-0 m-0">
                {this.props.text}
              </span>
            </small>
          ) : (
            ""
          )}
        </div>
        <ul class="dropdown-menu">{this.props.dropdownitems}</ul>
      </button>
    );
  }
}
