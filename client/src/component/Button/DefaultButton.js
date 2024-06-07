import React from "react";

export class DefaultButton extends React.Component {
  render() {
    return (
      <button
        className={
          "btn btn-sm d-flex align-items-center justify-content-center gap-2 p-2 fw-semibold " +
          this.props.class
        }
        type={this.props.type}
        disabled={this.props.disabled}
        data-bs-toggle={this.props.toggle}
        data-bs-target={this.props.target}
        data-bs-dismiss={this.props.dismiss}
      >
        {this.props.icon}
        {this.props.text}
      </button>
    );
  }
}
