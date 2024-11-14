import React from "react";
import { Link } from "react-router-dom";

export class LinkButton extends React.Component {
  render() {
    return (
      <Link
        to={this.props.to}
        state={this.props.state}
        className={`btn btn-sm d-flex align-items-center justify-content-center gap-2 ${
          this.props.text != null
            ? "p-1 " + this.props.class
            : "p-2 " + this.props.class
        }`}
      >
        <div
          className={`d-flex align-items-center justify-content-center gap-2 fw-semibold ${
            this.props.reversed ? "flex-row-reverse" : ""
          }`}
        >
          {this.props.icon}
          {this.props.text != null ? (
            <small>
              <span className={""}>{this.props.text}</span>
            </small>
          ) : (
            ""
          )}
        </div>
        {/* </button> */}
      </Link>
    );
  }
}
