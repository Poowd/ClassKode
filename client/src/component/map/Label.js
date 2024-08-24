import React from "react";

export class Label extends React.Component {
  render() {
    return (
      <button className="btn" onClick={this.props.trigger}>
        <li className={"text-primary px-2  " + this.props.class}>
          <header>
            {this.props.header} ( {this.props.capacity} ){" "}
          </header>
          <main>
            <p className="p-0 m-0">{this.props.content}</p>
          </main>
        </li>
      </button>
    );
  }
}
