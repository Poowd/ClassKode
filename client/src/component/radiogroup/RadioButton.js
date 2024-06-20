import React from "react";

export class RadioButton extends React.Component {
  render() {
    return (
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="radio"
          checked={this.props.checked}
          name={this.props.group}
          onChange={this.props.trigger}
          value={this.props.option}
          id={this.props.id}
          required={this.props.required}
        />
        <label class="form-check-label" for={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}
