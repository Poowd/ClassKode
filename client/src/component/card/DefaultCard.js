import React from "react";

export class DefaultCard extends React.Component {
  render() {
    return (
      <div className={"h-100 shadow-sm rounded p-2 " + this.props.class}>
        {this.props.content}
      </div>
    );
  }
}
