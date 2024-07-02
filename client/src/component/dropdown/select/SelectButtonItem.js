import React from "react";

export class SelectButtonItem extends React.Component {
  render() {
    return (
      <option value={this.props.value} onClick={this.props.trigger}>
        {this.props.content}
      </option>
    );
  }
}
