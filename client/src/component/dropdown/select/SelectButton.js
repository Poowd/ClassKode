import React from "react";

export class SelectButton extends React.Component {
  render() {
    return (
      <>
        <select
          class={"form-select " + this.props.class}
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
      </>
    );
  }
}
