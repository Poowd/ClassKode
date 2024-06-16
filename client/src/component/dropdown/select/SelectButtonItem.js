import React from "react";

export class SelectButtonItem extends React.Component {
  render() {
    return <option value={this.props.value}>{this.props.content}</option>;
  }
}
