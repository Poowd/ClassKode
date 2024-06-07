import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { BiGridAlt } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { FaUserSecret } from "react-icons/fa6";
import { PiQuestionMarkBold } from "react-icons/pi";
import { Sidebar } from "../sidebar/Sidebar";
import { SidebarItemList } from "../sidebar/SidebarItemList";
import { DefaultDropdown } from "../dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../dropdown/default/DefaultDropdownItem";

export class Topbar extends React.Component {
  render() {
    // const bootstrap = require("bootstrap");

    // const handleLogout = () => {
    //   axios
    //     .post("http://localhost:8081/logout")
    //     .then((res) => {
    //       if (res.data.Status === "Success") {
    //         window.location.reload(true);
    //       } else {
    //         alert("Error");
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // };

    // let Confirmation = null;
    // function getConfirmation() {
    //   if (!Confirmation) {
    //     Confirmation = new bootstrap.Modal(
    //       document.getElementById("Confirmation")
    //     );
    //   }
    //   return Confirmation;
    // }

    return (
      <nav className="main-top-bar">
        <div className="d-flex">
          <DefaultButton
            class=""
            icon={<BiGridAlt />}
            toggle={"offcanvas"}
            target={"#sidebar"}
          />
          <h5 className="p-0 m-0 d-flex align-items-center fw-bold">
            Class Kode
          </h5>
        </div>
        <div className="d-flex gap-2">
          <DefaultButton class="" icon={<PiQuestionMarkBold />} />
          <DefaultButton class="" icon={<FaUserSecret />} />
          <DefaultDropdown
            class="border-0"
            reversed={true}
            icon={<FiMoreVertical />}
            text={"User's Name"}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <DefaultDropdownItem title={"Contact"} />
                <DefaultDropdownItem title={"Visit us"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
        </div>
        <Sidebar id={"sidebar"} content={<SidebarItemList />} />
      </nav>
      // <main>
      //   <nav
      //     className="navbar navbar-expand-lg px-3"
      //     style={{
      //       backgroundColor: "#01579b",
      //     }}
      //   >
      //     <main className="w-100 d-lg-flex">
      //       <div className="w-100 d-flex justify-content-between">
      //         <div className="d-flex align-items-center gap-1">
      //           <IconButton
      //             class={"btn shadow-sm"}
      //             type={"button"}
      //             onClick={() => {}}
      //             databstoggle={"offcanvas"}
      //             databstarget={"#SideBarOffCanvas"}
      //             aria-controls={"SideBarOffCanvas"}
      //             image={dashboard}
      //             opacity={"1"}
      //             filter={"invert(100)"}
      //           />
      //           <img
      //             src={logo}
      //             alt="..."
      //             className="ratio ratio-1x1"
      //             style={{ height: "2.5em" }}
      //           ></img>
      //           <span className="navbar-brand fw-bold m-0 p-0 text-white">
      //             Class Kode
      //           </span>
      //         </div>
      //         <button
      //           className="navbar-toggler"
      //           type="button"
      //           data-bs-toggle="collapse"
      //           data-bs-target="#navbar"
      //         >
      //           <span className="navbar-toggler-icon text-white"></span>
      //         </button>
      //       </div>
      //       <div className="d-flex gap-2 mt-2 mt-lg-0">
      //         <div className="collapse navbar-collapse" id="navbar">
      //           <ul className="navbar-nav w-100 me-auto mb-lg-0 p-1 rounded shadow-sm">
      //             <li className="nav-item dropdown d-flex flex-row-reverse gap-1">
      //               <IconTextButton
      //                 class={"btn-link text-black shadow-sm text-white"}
      //                 type={"button"}
      //                 onClick={() => {}}
      //                 databstoggle={"dropdown"}
      //                 reverse={"flex-row-reverse"}
      //                 text={this.props.username}
      //                 image={user}
      //                 opacity={"1"}
      //                 filter={"invert(100)"}
      //               />

      //               <ul className="dropdown-menu  dropdown-menu-end">
      //                 <li>
      //                   <Link to={"/"} className="dropdown-item">
      //                     <li>Action</li>
      //                   </Link>
      //                 </li>
      //                 <li>
      //                   <hr className="dropdown-divider" />
      //                 </li>
      //                 <li>
      //                   <a className="dropdown-item" onClick={handleLogout}>
      //                     Logout
      //                   </a>
      //                 </li>
      //               </ul>
      //             </li>
      //           </ul>
      //         </div>
      //       </div>
      //     </main>
      //   </nav>
      //   <OffCanvas
      //     class="sidebar-panel"
      //     id={"SideBarOffCanvas"}
      //     content={
      //       <SideNavigationBar superadminlevel={this.props.superadminlevel} />
      //     }
      //   />
      // </main>
    );
  }
}
