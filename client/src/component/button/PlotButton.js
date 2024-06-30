import React from "react";
import { Link } from "react-router-dom";

export class PlotButton extends React.Component {
  render() {
    return (
      <button
        className={
          "btn btn-sm d-flex align-items-center justify-content-center w-100 h-100"
        }
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.function}
        data-bs-toggle={this.props.toggle}
        data-bs-target={this.props.target}
        data-bs-dismiss={this.props.dismiss}
      >
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
              <span className="fw-semibold">{this.props.text}</span>
            </small>
          ) : (
            ""
          )}
        </div>
      </button>
    );
  }
}
