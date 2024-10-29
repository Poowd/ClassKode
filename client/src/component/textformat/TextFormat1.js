import React from "react";

export class TextFormat1 extends React.Component {
  render() {
    return (
      <main className="row m-0 p-0">
        <section className="col-10 m-0 p-0 fw-normal">
          {this.props.header}
        </section>
        <section className="col-2 m-0 p-0 px-2 text-end">
          {this.props.data}
        </section>
      </main>
    );
  }
}
