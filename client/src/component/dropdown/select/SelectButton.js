import React from "react";

export class SelectButton extends React.Component {
  render() {
    return (
      <select class="form-select" aria-label="Default select example">
        {this.props.option}
      </select>
    );
  }
}
