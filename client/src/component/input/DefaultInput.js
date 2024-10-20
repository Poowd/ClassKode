import React from "react";

export class DefaultInput extends React.Component {
  render() {
    return (
      <input
        className={`form-control form-control-sm shadow-none ${this.props.class}`}
        type={
          this.props.type === null || this.props.type === ""
            ? "text"
            : this.props.type
        }
        autoComplete="off"
        id={this.props.id}
        name={this.props.id}
        onChange={this.props.trigger}
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    );
  }
}
