import React from "react";

export class TextFormat3 extends React.Component {
  render() {
    return (
      <main>
        <section className="mb-3">
          <h1 className="fw-bold text-3xl">{this.props.title}</h1>
          <h3 className="fw-semibold text-md">{this.props.subtitle}</h3>
          <p>{this.props.details}</p>
        </section>
        <section>{this.props.additional}</section>
      </main>
    );
  }
}
