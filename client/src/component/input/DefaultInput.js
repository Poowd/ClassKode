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
        id={this.props.id}
        name={this.props.name}
        onChange={this.props.trigger}
        placeholder={this.props.placeholder}
      />
    );
  }
}
