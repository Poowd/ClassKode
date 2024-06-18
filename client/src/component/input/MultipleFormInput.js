import React from "react";

export class MultipleFormInput extends React.Component {
  render() {
    return (
      <div className="my-2 p-0">
        <div>
          <label for={this.props.id}>
            <small>
              <span className="fw-semibold">{this.props.label}</span>
            </small>
          </label>
          <div class="input-group p-0">{this.props.item}</div>
        </div>
        <small>
          <div className={"row m-0 " + this.props.success}>{this.props.alert}</div>
        </small>
      </div>
    );
  }
}
