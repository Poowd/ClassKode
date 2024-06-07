import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { Link } from "react-router-dom";

export class Sidebar extends React.Component {
  render() {
    return (
      <div
        className="offcanvas offcanvas-start m-2 rounded"
        tabIndex="-1"
        id={this.props.id}
      >
        <div className="offcanvas-header mb-0 pb-0 d-flex justify-content-between align-items-center">
          <Link to={"/"}>
            <DefaultButton
              class="border-0"
              type="button"
              icon={<FaSchoolFlag />}
              text={"STI College Muñoz-EDSA"}
            />
          </Link>
          <DefaultButton
            type="button"
            class=""
            icon={<IoClose />}
            dismiss="offcanvas"
          />
        </div>
        <hr className="text-light mx-3 py-0 mb-0" />
        <div className="offcanvas-body py-0 my-0">{this.props.content}</div>
      </div>
    );
  }
}
