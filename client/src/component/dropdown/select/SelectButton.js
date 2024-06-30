import React from "react";

export class SelectButton extends React.Component {
  render() {
    return (
      <div className={"my-2 " + this.props.width}>
        {this.props.label !== null ? (
          <label for={this.props.id}>
            <small>
              <span className="fw-semibold">{this.props.label}</span>
            </small>
          </label>
        ) : null}
        <select
          className={"form-select " + this.props.class}
          aria-label="Default select example"
          onChange={this.props.trigger}
          name={this.props.id}
          id={this.props.id}
          required={this.props.required}
        >
          {this.props.option}
        </select>
        <small>
          <p className={"p-0 m-0 " + this.props.success}>{this.props.alert}</p>
        </small>
      </div>
    );
  }
}
