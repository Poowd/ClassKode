import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/ClassKode Logo (1).png";

export class Sidebar extends React.Component {
  render() {
    return (
      <div
        className="offcanvas offcanvas-start m-2 rounded"
        tabIndex="-1"
        id={this.props.id}
      >
        <div className="offcanvas-header mb-0 pb-0 d-flex justify-content-between align-items-center">
          <Link to={"/"} className="">
            <div className="h-100 d-flex gap-1">
              <img
                src={Logo}
                alt="..."
                className="img-fluid p-1"
                style={{ height: "3em" }}
              />
              <h5 className="p-0 m-0 d-flex align-items-center text-black">
                <span className="fw-bold">Class</span>
                <span> </span>
                <span className="fw-light">Kode</span>
              </h5>
            </div>
          </Link>
          <DefaultButton
            type="button"
            class="p-2"
            icon={<IoClose />}
            dismiss="offcanvas"
          />
        </div>
        <hr className="text-dark mx-3 py-0 mb-0" />
        <div className="offcanvas-body py-0 my-0 w-100">
          {this.props.content}
        </div>
      </div>
    );
  }
}
