import React from "react";

export class RadioGroup extends React.Component {
  render() {
    return (
      <div className={"row mb-2"}>
        <div className="col-2">
          <label
            for={this.props.id}
            className={`${this.props.hidden ? "d-none" : "d-block"}`}
          >
            <span className="fw-semibold">
              {this.props.label}
              <span className="text-secondary fw-normal">
                {this.props.labelextension}
              </span>
            </span>
          </label>
        </div>
        <div className="col-10">
          <div className="d-flex gap-3 my-2">{this.props.selection}</div>
        </div>
      </div>
    );
  }
}
