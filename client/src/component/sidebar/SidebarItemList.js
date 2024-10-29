import React, { useState } from "react";
import owie from "../../assets/imgs/misc/owie.png";

export class SidebarItemList extends React.Component {
  render() {
    return (
      <main className="w-100 h-100 bg-white shadow-lg rounded p-1">
        <main className="h-100 m-0 p-2" id="menu">
          {this.props.list}
        </main>
      </main>
    );
  }
}
