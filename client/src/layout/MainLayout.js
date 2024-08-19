import React from "react";
import "../css/Layout.css";
import { Topbar } from "../component/topbar/Topbar";

export class MainLayout extends React.Component {
  render() {
    return (
      <>
        <main className="vh-100 bg-light">
          <header className="main-header">
            <Topbar
              user={this.props.user}
              logout={this.props.logout}
              menuicon={this.props.menuicon}
              helpicon={this.props.helpicon}
              usericon={this.props.usericon}
            />
          </header>
          <main className="main-content ">
            <section className="h-100 shadow-sm bg-white rounded p-2">
              <main className="h-100 rounded overflow-y-auto">
                {this.props.content}
              </main>
            </section>
          </main>
        </main>
      </>
    );
  }
}
