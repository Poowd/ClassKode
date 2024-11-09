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
        {/* <button
          className={"btn btn-sm p-0 " + this.props.textclass}
          type={this.props.type}
          disabled={this.props.disabled}
          onClick={this.props.function}
          data-bs-toggle={this.props.toggle}
          data-bs-target={this.props.target}
          data-bs-dismiss={this.props.dismiss}
        > */}
        <div
          className={`d-flex align-items-center justify-content-center gap-1 ${
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
