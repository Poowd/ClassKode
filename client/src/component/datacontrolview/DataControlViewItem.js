import React from "react";

export class DataControlViewItem extends React.Component {
  render() {
    return (
      <section className="row mx-0 my-2">
        <div className="col-3 p-0 fw-semibold">{this.props.label}</div>
        <div className="col-9 p-0">{this.props.content}</div>
      </section>
    );
  }
}
