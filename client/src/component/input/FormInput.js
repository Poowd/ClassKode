import React from "react";

export class FormInput extends React.Component {
  render() {
    return (
      <div className="my-2">
        <label
          for={this.props.id}
          className={this.props.hidden ? "d-none" : "d-block"}
        >
          <small>
            <span className="fw-semibold">
              {this.props.label}{" "}
              <span className="text-secondary fw-normal">
                {this.props.labelextension}
              </span>
            </span>
          </small>
        </label>
        <input
          id={this.props.id}
          name={this.props.id}
          type={"text"}
          className={"form-control shadow-none " + this.props.class}
          placeholder={this.props.placeholder}
          onChange={this.props.trigger}
          value={this.props.value}
          required={this.props.required}
          disabled={this.props.disabled}
        />
        <small>
          <p className={"p-0 m-0 " + this.props.success}>{this.props.alert}</p>
        </small>
      </div>
    );
  }
}
