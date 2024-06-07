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
                {/* Curriculum AcademicYear Schedule Locator */}
                <li className="nav-item">
                  <Link
                    to="/utilities/curriculum"
                    className="nav-link align-middle px-0"
                  >
                    <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
                      Curriculum
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/utilities/academicyear"
                    className="nav-link align-middle px-0"
                  >
                    <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
                      AcademicYear
                    </span>
                  </Link>
                </li>
                <SidebarDropdown
                  text={"Schedule"}
                  reference={"#schedule"}
                  referenced={"schedule"}
                  parent={"#menu-utilities"}
                  itemlist={
                    <>
                      {/* Coach Course Department Program Room Section */}
                      <SidebarDropdownItem
                        navigate={"/utilities/classschedules"}
                        text={"Class Schedules"}
                      />
                    </>
                  }
                />
                <li className="nav-item">
                  <Link
                    to="/utilities/facultylocator"
                    className="nav-link align-middle px-0"
                  >
                    <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
                      Faculty Locator
                    </span>
                  </Link>
                </li>
              </>
            }
          />
        </ul>
      </div>
    );
  }
}
