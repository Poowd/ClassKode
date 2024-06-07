import React from "react";
import "./Layout.css";
import { Topbar } from "../component/topbar/Topbar";

export class MainLayout extends React.Component {
  render() {
    return (
      <main className="vh-100 bg-light">
        <header className="main-header">
          <Topbar />
        </header>
        <main className="main-content">
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
