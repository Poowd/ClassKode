import React from "react";

export class MultipleFormInputItem extends React.Component {
  render() {
    return (
      <input
        id={this.props.id}
        type={"text"}
        className={"form-control shadow-none " + this.props.class}
        placeholder={this.props.placeholder}
        value={this.props.value}
        required
      />
    );
  }
}
