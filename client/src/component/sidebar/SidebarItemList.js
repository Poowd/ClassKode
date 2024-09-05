import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images for Icons
import { SidebarDropdownItem } from "../dropdown/sidebar/SidebarDropdownItem";
import { SidebarDropdown } from "../dropdown/sidebar/SidebarDropdown";
import { FcSurvey } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcPackage } from "react-icons/fc";
import { FcTimeline } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { FcGraduationCap } from "react-icons/fc";
import { FcSportsMode } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcDiploma1 } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

export class SidebarItemList extends React.Component {
  render() {
    return (
      <div className="w-100 d-flex flex-column align-items-center align-items-sm-start px-4 pt-2">
        <ul
          className="w-100 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="w-100 nav-item">
            <Link to="/" className="nav-link align-middle px-0">
              <span className="ms-2 d-none d-sm-inline text-dark fw-medium">
                Dashboard
              </span>
            </Link>
          </li>
          <hr className="text-dark my-1 w-100" />
          <li className="w-100 nav-item">
            <SidebarDropdown
              text={"Institution"}
              reference={"#institution"}
              referenced={"institution"}
              parent={"#menu"}
              itemlist={
                <>
                  {/* Coach Course Department Program Room Section */}
                  <SidebarDropdownItem
                    icon={<FcDepartment />}
                    navigate={"/institution/department"}
                    text={"Department"}
                  />
                  <SidebarDropdownItem
                    icon={<FcDiploma1 />}
                    navigate={"/institution/program"}
                    text={"Program"}
                  />
                  <SidebarDropdownItem
                    icon={<FcSportsMode />}
                    navigate={"/institution/course"}
                    text={"Course"}
                  />
                  <SidebarDropdownItem
                    icon={<FcManager />}
                    navigate={"/institution/coach"}
                    text={"Coach"}
                  />
                  <SidebarDropdownItem
                    icon={<FcReading />}
                    navigate={"/institution/section"}
                    text={"Section"}
                  />
                  <SidebarDropdownItem
                    icon={<FcHome />}
                    navigate={"/institution/room"}
                    text={"Room"}
                  />
                </>
              }
            />
          </li>
          <hr className="text-dark my-1 w-100" />
          <li className="w-100 nav-item">
            <SidebarDropdown
              text={"Utilities"}
              reference={"#utilities"}
              referenced={"utilities"}
              parent={"#menu"}
              itemlist={
                <>
                  {/* Coach Course Department Program Room Section */}
                  <SidebarDropdownItem
                    icon={<FcGraduationCap />}
                    navigate={"/utilities/curriculum"}
                    text={"Curriculum"}
                  />
                  <SidebarDropdownItem
                    icon={<FcPlanner />}
                    navigate={"/utilities/academicyear"}
                    text={"Academic Year"}
                  />
                  <SidebarDropdownItem
                    icon={<FcTimeline />}
                    navigate={"/utilities/schedule"}
                    text={"Schedule"}
                  />
                  <SidebarDropdownItem
                    icon={<FcSurvey />}
                    navigate={"/utilities/locator"}
                    text={"Faculty Locator"}
                  />
                </>
              }
            />
          </li>
          <hr className="text-dark my-1 w-100" />
          <li className="w-100 nav-item">
            <SidebarDropdown
              text={"Miscellaneous"}
              reference={"#miscellaneous"}
              referenced={"miscellaneous"}
              parent={"#menu"}
              itemlist={
                <>
                  {/* Coach Course Department Program Room Section */}
                  <SidebarDropdownItem
                    icon={<FcPackage />}
                    navigate={"/miscellaneous/archive"}
                    text={"Archive"}
                  />
                  <SidebarDropdownItem
                    icon={<FcViewDetails />}
                    navigate={"/miscellaneous/log"}
                    text={"Log"}
                  />
                  <SidebarDropdownItem
                    icon={<FcBusinessman />}
                    navigate={"/miscellaneous/user"}
                    text={"User"}
                  />
                  <SidebarDropdownItem
                    icon={<FcOpenedFolder />}
                    navigate={"/miscellaneous/setup"}
                    text={"Setup"}
                  />
                </>
              }
            />
          </li>
        </ul>
      </div>
    );
  }
}
