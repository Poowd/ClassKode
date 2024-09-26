import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logo/ClassKode Logo (1).png";

export class Sidebar extends React.Component {
  render() {
    return (
      <div
        className="w-100 h-100 offcanvas offcanvas-top bg-transparent p-3"
        tabIndex="-1"
        id={this.props.id}
      >
        <main className="h-100 w-100 position-relative p-2 m-0">
          <div className="position-absolute top-0 start-0 m-0 p-0 d-flex justify-content-start">
            <Link to={"/"} className="">
              <div className="">
                <img
                  src={Logo}
                  alt="..."
                  className="img-fluid"
                  style={{ height: "5em" }}
                />
              </div>
            </Link>
          </div>
          <div className="w-100 position-absolute bottom-0 start-0 m-0 p-0 d-flex justify-content-center">
            <div className="d-flex align-items-center py-2">
              <DefaultButton
                type="button"
                class="bg-white rounded-pill px-3 py-2 border border-dark"
                text="Close Navigation"
                icon={<IoClose />}
                dismiss="offcanvas"
              />
            </div>
          </div>

          <div className="offcanvas-body m-0 h-100 w-100">
            {this.props.content}
          </div>
        </main>
      </div>
    );
  }
}
