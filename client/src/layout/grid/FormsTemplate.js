import React from "react";
import { CoffeeLoader } from "../../component/loader/CoffeeLoader";

export class FormsTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-hidden">
        <>{this.props.loader ? <CoffeeLoader /> : null}</>
        <main className="h-100 overflow-y-auto">
          <main className="h-100">
            <section className="h-100">{this.props.content}</section>
          </main>
        </main>
      </main>
    );
  }
}
