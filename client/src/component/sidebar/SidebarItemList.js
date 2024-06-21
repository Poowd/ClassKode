import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images for Icons
import { SidebarDropdownItem } from "../dropdown/sidebar/SidebarDropdownItem";
import { SidebarDropdown } from "../dropdown/sidebar/SidebarDropdown";

export class SidebarItemList extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center align-items-sm-start px-4 pt-2">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link to="/" className="nav-link align-middle px-0">
              <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
                Dashboard
              </span>
            </Link>
          </li>
          <SidebarDropdown
            text={"Institution"}
            reference={"#institution"}
            referenced={"institution"}
            parent={"#menu"}
            itemlist={
              <>
                {/* Coach Course Department Program Room Section */}
                <SidebarDropdownItem
                  navigate={"/institution/department"}
                  text={"Department"}
                />
                <SidebarDropdownItem
                  navigate={"/institution/program"}
                  text={"Program"}
                />
                <SidebarDropdownItem
                  navigate={"/institution/course"}
                  text={"Course"}
                />
                <SidebarDropdownItem
                  navigate={"/institution/coach"}
                  text={"Coach"}
                />
                <SidebarDropdownItem
                  navigate={"/institution/section"}
                  text={"Section"}
                />
                <SidebarDropdownItem
                  navigate={"/institution/room"}
                  text={"Room"}
                />
              </>
            }
          />
          <SidebarDropdown
            text={"Utilities"}
            reference={"#utilities"}
            referenced={"utilities"}
            parent={"#menu"}
            itemlist={
              <>
                {/* Coach Course Department Program Room Section */}
                <SidebarDropdownItem
                  navigate={"/utilities/curriculum"}
                  text={"Curriculum"}
                />
                <SidebarDropdownItem
                  navigate={"/utilities/academicyear"}
                  text={"Academic Year"}
                />
                <SidebarDropdownItem
                  navigate={"/utilities/schedule"}
                  text={"Schedule"}
                />
                <SidebarDropdownItem
                  navigate={"/utilities/locator"}
                  text={"Faculty Locator"}
                />
              </>
            }
          />
          <SidebarDropdown
            text={"Miscellaneous"}
            reference={"#miscellaneous"}
            referenced={"miscellaneous"}
            parent={"#menu"}
            itemlist={
              <>
                {/* Coach Course Department Program Room Section */}
                <SidebarDropdownItem
                  navigate={"/miscellaneous/archive"}
                  text={"Archive"}
                />
                <SidebarDropdownItem
                  navigate={"/miscellaneous/log"}
                  text={"Log"}
                />
                <SidebarDropdownItem
                  navigate={"/miscellaneous/user"}
                  text={"User"}
                />
                <SidebarDropdownItem
                  navigate={"/miscellaneous/setup"}
                  text={"Setup"}
                />
              </>
            }
          />
        </ul>
      </div>
    );
  }
}
