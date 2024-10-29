import React from "react";

export class TextFormat4 extends React.Component {
  render() {
    return (
      <main className={this.props.class}>
        <section className="mb-3">
          <h3 className="fw-semibold">{this.props.title}</h3>
          <h5 className="fw-semibold text-md">{this.props.subtitle}</h5>
          <p>{this.props.details}</p>
        </section>
        <section>{this.props.additional}</section>
      </main>
    );
  }
}
