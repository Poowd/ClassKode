import React from "react";

export class DefaultText extends React.Component {
  render() {
    return (
      <input
        class="form-control form-control-sm"
        type="text"
        placeholder={this.props.placeholder}
      />
    );
  }
}
