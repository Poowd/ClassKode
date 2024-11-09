import React from "react";
import "../Dropdown.css";

export class DefaultDropdown extends React.Component {
  render() {
    return (
      <div className={`${this.props.topclass}`}>
        <button
          className={`btn btn-sm d-flex align-items-center justify-content-center gap-2 ${
            this.props.text != null
              ? "p-1  " + this.props.class
              : "p-2 " + this.props.class
          }`}
          type={"button"}
          disabled={this.props.disabled}
          data-bs-toggle={"dropdown"}
          data-bs-target={this.props.target}
          data-bs-dismiss={this.props.dismiss}
        >
          <div
            className={`d-flex align-items-center justify-content-center gap-1 ${
              this.props.reversed ? "flex-row-reverse" : ""
            }`}
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
        <ul className="dropdown-menu">{this.props.dropdownitems}</ul>
      </div>
    );
  }
}
