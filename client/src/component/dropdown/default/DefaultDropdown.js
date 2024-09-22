import React from "react";
import "../Dropdown.css";

export class DefaultDropdown extends React.Component {
  render() {
    return (
      <div className="btn-group z-3">
        <button
          className={
            this.props.text != null
              ? "btn btn-sm d-flex align-items-center justify-content-center gap-2 p-1 " +
                this.props.class
              : "btn btn-sm d-flex align-items-center justify-content-center gap-2 p-2 " +
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
              <small>
                <span className="fw-semibold m-0 p-0">{this.props.text}</span>
              </small>
            ) : (
              ""
            )}
          </div>
        </button>
        <ul className="dropdown-menu z-3">{this.props.dropdownitems}</ul>
      </div>
    );
  }
}
