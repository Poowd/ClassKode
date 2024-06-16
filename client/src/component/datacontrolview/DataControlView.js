import React from "react";

export class DataControlView extends React.Component {
  render() {
    return <main className="p-2">{this.props.content}</main>;
  }
}
