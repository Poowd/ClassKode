import React from "react";

export class FormInput extends React.Component {
  render() {
    return (
      <div className="mb-2">
        <label>
          <span className="fw-semibold">{this.props.label}</span>
        </label>
        <input
          id={this.props.id}
          type={"text"}
          className={"form-control shadow-none"}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
