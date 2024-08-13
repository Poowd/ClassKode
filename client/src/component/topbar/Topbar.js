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

export class Topbar extends React.Component {
  render() {
    const handleLogout = () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("loggedin");
      window.location.reload(true);
    };

    return (
      <nav className="main-top-bar gradient-bg-blue">
        <div className="h-100 d-flex">
          <DefaultButton
            class="text-light"
            icon={<BiGridAlt />}
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
        <div className="d-flex gap-2">
          <DefaultButton class="text-light" icon={<PiQuestionMarkBold />} />
          <DefaultButton
            class="text-light px-2"
            reversed={true}
            icon={<FaUserSecret />}
            text={this.props.user}
            function={() => {}}
            toggle="modal"
            target="#MenuModal"
          />
        </div>
        <Sidebar id={"sidebar"} content={<SidebarItemList />} />

        <ViewModal
          id={"MenuModal"}
          title={<h6 className="text-center text-black">What to Do?</h6>}
          content={
            <>
              <DefaultButton
                class="w-100 btn-danger"
                reversed={true}
                icon={<PiQuestionMarkBold />}
                text="Logout"
                function={handleLogout}
              />
            </>
          }
        />
      </nav>
    );
  }
}
