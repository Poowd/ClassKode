import React from "react";

export class MainInput extends React.Component {
  render() {
    return (
      <div className="row mb-2 align-items-center">
        <div className="col-2">
          <label
            for={this.props.id}
            className={`${this.props.hidden ? "d-none" : "d-block"}`}
          >
            <span className="fw-semibold">
              {this.props.label}
              <span className="text-secondary fw-normal">
                {this.props.labelextension}
              </span>
            </span>
          </label>
        </div>
        <div className="col-10">
          <input
            id={this.props.id}
            name={this.props.id}
            type={this.props.type}
            className={"form-control shadow-none " + this.props.class}
            placeholder={this.props.placeholder}
            onChange={this.props.trigger}
            value={this.props.value}
            required={this.props.required}
            disabled={this.props.disabled}
          />
          <div class={`${this.props.feedbackstatus}`}>
            {this.props.feedback}
          </div>
        </div>
      </div>
    );
  }
}
