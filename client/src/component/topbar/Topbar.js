import axios from "axios";
import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { BiGridAlt } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserSecret } from "react-icons/fa6";
import { PiQuestionMarkBold } from "react-icons/pi";
import { Sidebar } from "../sidebar/Sidebar";
import { SidebarItemList } from "../sidebar/SidebarItemList";
import { DefaultDropdown } from "../dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../dropdown/default/DefaultDropdownItem";
import Logo from "../../assets/logo/ClassKode Logo (1).png";
import { ViewModal } from "../modal/ViewModal";
import { useNavigate } from "react-router-dom";
import { DefaultInput } from "../input/DefaultInput";
import { LinkButton } from "../button/LinkButton";

export class Topbar extends React.Component {
  render() {
    return (
      <nav className="main-top-bar gradient-bg-blue">
        <div className="h-100 d-flex">
          <DefaultButton
            class="text-light border-0 px-2 fs-6"
            icon={this.props.menuicon}
            toggle={"offcanvas"}
            target={"#sidebar"}
          />
          <div className="h-100 d-flex gap-1">
            <img src={Logo} alt="..." className="h-100 img-fluid p-1" />
            <h5 className="p-0 m-0 d-flex align-items-center text-white">
              <span className="fw-bold">Class</span>
              <span> </span>
              <span className="fw-light">Kode</span>
            </h5>
          </div>
        </div>
        <div className="d-flex">
          <DefaultButton
            class="text-light px-2"
            reversed={true}
            icon={this.props.quicknav}
            function={() => {}}
            toggle="modal"
            target="#QuickNav"
          />
          <DefaultButton class="text-light" icon={this.props.helpicon} />
          <DefaultButton
            class="text-light px-2"
            reversed={true}
            icon={this.props.usericon}
            text={this.props.user}
            function={() => {}}
            toggle="modal"
            target="#MenuModal"
          />
        </div>
        <Sidebar id={"sidebar"} content={<SidebarItemList />} />

        <ViewModal
          id={"MenuModal"}
          title={<h6 className="text-center text-black">Menu</h6>}
          content={
            <>
              <DefaultButton
                class="w-100 btn-danger py-2"
                reversed={true}
                icon={<PiQuestionMarkBold />}
                text="Logout"
                function={this.props.logout}
              />
            </>
          }
        />
        <ViewModal
          id={"QuickNav"}
          title={<h6 className="text-center text-black">Quick Navigation</h6>}
          content={this.props.quicknavaction}
        />
      </nav>
    );
  }
}
