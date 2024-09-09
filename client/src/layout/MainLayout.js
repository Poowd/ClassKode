import React from "react";
import "../css/Layout.css";
import { Topbar } from "../component/topbar/Topbar";
import powd from "../assets/imgs/misc/char.png";
import { DefaultButton } from "../component/button/DefaultButton";

export class MainLayout extends React.Component {
  render() {
    return (
      <main className="vh-100 bg-light position-relative">
        <header className="main-header">
          <Topbar
            user={this.props.user}
            logout={this.props.logout}
            quicknav={this.props.quicknav}
            quicknavaction={this.props.quicknavaction}
            menuicon={this.props.menuicon}
            helpicon={this.props.helpicon}
            usericon={this.props.usericon}
          />
        </header>
        <main className="main-content p-2">
          <section className="h-100 shadow-sm bg-white rounded p-2">
            <main className="h-100 rounded overflow-y-auto">
              {this.props.content}
            </main>
          </section>
        </main>
        <figure className="position-fixed bottom-0 start-0 ms-3 z-3">
          <DefaultButton
            class="text-light"
            reversed={true}
            icon={
              <img src={powd} alt="..." className="sheep ratio ratio-1x1"></img>
            }
            function={() => {}}
            toggle="modal"
            target="#QuickNav"
          />
        </figure>
      </main>
    );
  }
}
