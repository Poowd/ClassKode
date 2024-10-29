import React from "react";
import "../css/Layout.css";

export class MainLayout extends React.Component {
  render() {
    return (
      <main className="vh-100 bg-light position-relative">
        <header className="main-header">{this.props.topbar}</header>
        <main className="main-content p-2">
          <section className="h-100 shadow-sm bg-white rounded p-2">
            <main className="h-100 rounded overflow-y-auto">
              {this.props.content}
            </main>
          </section>
        </main>
      </main>
    );
  }
}
