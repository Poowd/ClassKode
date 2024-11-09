import React from "react";

export class DefaultButton extends React.Component {
  render() {
    return (
      <button
        className={`btn btn-sm d-flex align-items-center justify-content-center gap-2 ${
          this.props.text != null
            ? "p-1 " + this.props.class
            : "p-2 " + this.props.class
        }`}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.function}
        data-bs-toggle={this.props.toggle}
        data-bs-target={this.props.target}
        data-bs-dismiss={this.props.dismiss}
      >
        <span
          className={`d-flex align-items-center justify-content-center gap-2 ${
            this.props.reversed ? "flex-row-reverse" : ""
          }`}
        >
          {this.props.icon}
          {this.props.text != null ? (
            <small className="fw-semibold">{this.props.text}</small>
          ) : (
            ""
          )}
        </span>
      </button>
    );
  }
}
