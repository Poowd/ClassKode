import React from "react";

export class FormsTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-y-auto">
        <main className="h-100">
          <section className="h-100">{this.props.content}</section>
        </main>
      </main>
    );
  }
}
