import React from "react";

export class Content1 extends React.Component {
  render() {
    return (
      <main className={this.props.class}>
        <main className="container my-5 py-5">
          <section>{this.props.content}</section>
        </main>
      </main>
    );
  }
}
