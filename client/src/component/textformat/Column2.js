import React from "react";

export class Column2 extends React.Component {
  render() {
    return (
      <main className="row m-0 p-3">
        <section className="col-6 p-0 m-0">{this.props.left}</section>
        <section className="col-lg-6 p-0 m-0">{this.props.right}</section>
      </main>
    );
  }
}
