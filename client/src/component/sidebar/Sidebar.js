import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logo/ClassKode Logo (1).png";

export class Sidebar extends React.Component {
  render() {
    return (
      <div
        className="h-100 offcanvas offcanvas-start"
        tabIndex="-1"
        id={this.props.id}
      >
        <main className="h-100 w-100 m-0">
          <div className="offcanvas-body m-0 p-2 h-100 w-100 ">
            {this.props.content}
          </div>
        </main>
      </div>
    );
  }
}
