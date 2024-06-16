import React from "react";

export class FormInput extends React.Component {
  render() {
    return (
      <div className="my-2">
        <label for={this.props.id}>
          <small>
            <span className="fw-semibold">{this.props.label}</span>
          </small>
        </label>
        <input
          id={this.props.id}
          type={"text"}
          className={"form-control shadow-none " + this.props.class}
          placeholder={this.props.placeholder}
          value={this.props.value}
          required
        />
      </div>
    );
  }
}
