import React from "react";

export class DefaultInput extends React.Component {
  render() {
    return (
      <input
        className={"form-control form-control-sm"}
        type="text"
        placeholder={this.props.placeholder}
      />
    );
  }
}
