import React from "react";

export class DefaultInput extends React.Component {
  render() {
    return (
      <input
        className={"form-control form-control-sm shadow-none"}
        type="text"
        name={this.props.name}
        onChange={this.props.trigger}
        placeholder={this.props.placeholder}
      />
    );
  }
}
