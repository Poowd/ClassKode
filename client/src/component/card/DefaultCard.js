import React from "react";

export class DefaultCard extends React.Component {
  render() {
    return (
      <div className="h-100 bg-white shadow-sm rounded p-2">
        {this.props.content}
      </div>
    );
  }
}
