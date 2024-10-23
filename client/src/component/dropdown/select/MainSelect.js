import React from "react";

export class MainSelect extends React.Component {
  render() {
    return (
      <div className="row mb-2 align-items-center">
        <section className="col-2">
          <label for={this.props.id}>
            <span className="fw-semibold">{this.props.label}</span>
          </label>
        </section>
        <section className="col-10">
          <select
            className={"form-select shadow-none " + this.props.class}
            aria-label="Default select example"
            onChange={this.props.trigger}
            name={this.props.id}
            id={this.props.id}
            required={this.props.required}
            disabled={this.props.disabled}
          >
            {this.props.option}
          </select>
        </section>
      </div>
    );
  }
}
