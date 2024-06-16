import React from "react";

export class RadioGroup extends React.Component {
  render() {
    return (
      <div className="my-2">
        <label for={this.props.id}>
          <small>
            <span className="fw-semibold">{this.props.label}</span>
          </small>
        </label>
        <div className="d-flex gap-3 my-2">{this.props.selection}</div>
      </div>
    );
  }
}
