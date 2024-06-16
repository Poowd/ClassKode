import React from "react";

export class SelectButtonItemSelected extends React.Component {
  render() {
    return <option selected>{this.props.content}</option>;
  }
}
