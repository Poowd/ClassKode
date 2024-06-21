import React from "react";

export class ViewCard extends React.Component {
  render() {
    return (
      <div
        className="shadow-sm rounded p-2 mb-2"
        style={{ height: this.props.height }}
      >
        <div className="h-100 overflow-y-auto p-2">
          <h6 className="p-0 m-0 text-secondary">{this.props.title}</h6>
          <ul className="py-2 px-3">{this.props.content}</ul>
        </div>
      </div>
    );
  }
}
