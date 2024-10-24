import React from "react";

export class TextFormat2 extends React.Component {
  render() {
    return (
      <main className="row m-0 p-1">
        <section className="col-3 m-0 p-0 fw-normal border-end">
          {this.props.header}
        </section>
        <section className="col-9 m-0 p-0 px-2 text-truncate">
          {this.props.data}
        </section>
      </main>
    );
  }
}
