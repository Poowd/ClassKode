import React from "react";

export class SelectButton extends React.Component {
  render() {
    return (
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={this.props.trigger}
        name={this.props.id}
        id={this.props.id}
      >
        {this.props.option}
      </select>
    );
  }
}
