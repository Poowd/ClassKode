import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images for Icons
import { SidebarDropdownItem } from "../dropdown/sidebar/SidebarDropdownItem";
import { SidebarDropdown } from "../dropdown/sidebar/SidebarDropdown";
import { CollapseButton } from "../button/CollapsButton";
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
      <main className="w-100 h-100 bg-white shadow-lg rounded p-2">
        <main className="h-100 w-100 bg-white shadow-sm rounded d-flex justify-content-center align-items-center overflow-y-auto">
          <main className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-lg-100 gap-5 p-0 m-0">
            <section className="w-100 p-3">
              <Link to={"/"} className="">
                <span className="text-dark fw-medium">
                  <figure className="p-0 m-0 text-center">
                    <h1 className="display-1">
                      <FcViewDetails />
                    </h1>
                    <h6 className="text-dark fw-medium">Dashboard</h6>
                  </figure>
                </span>
              </Link>
            </section>
            <SidebarDropdown
              text={
                <>
                  <figure className="p-0 m-0 text-center">
                    <h1 className="display-1">
                      <FcViewDetails />
                    </h1>
                    <h6 className="text-dark fw-medium">Records</h6>
                  </figure>
                </>
              }
              reference={"#Records"}
              referenced={"Records"}
              parent={"#menu"}
              itemlist={
                <main className="d-flex flex-column gap-2">
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
                </main>
              }
            />
            <SidebarDropdown
              text={
                <>
                  <figure className="p-0 m-0 text-center">
                    <h1 className="display-1">
                      <FcViewDetails />
                    </h1>
                    <h6 className="text-dark fw-medium">Scheduler</h6>
                  </figure>
                </>
              }
              reference={"#Scheduler"}
              referenced={"Scheduler"}
              parent={"#menu"}
              itemlist={
                <main className="d-flex flex-column gap-2">
                  <SidebarDropdownItem
                    icon={<FcTimeline />}
                    navigate={"/utilities/schedule"}
                    text={"Schedule"}
                  />
                </main>
              }
            />
            <SidebarDropdown
              text={
                <>
                  <figure className="p-0 m-0 text-center">
                    <h1 className="display-1">
                      <FcViewDetails />
                    </h1>
                    <h6 className="text-dark fw-medium">Locator</h6>
                  </figure>
                </>
              }
              reference={"#Locator"}
              referenced={"Locator"}
              parent={"#menu"}
              itemlist={
                <main className="d-flex flex-column gap-2">
                  <SidebarDropdownItem
                    icon={<FcSurvey />}
                    navigate={"/utilities/locator"}
                    text={"Faculty Locator"}
                  />
                </main>
              }
            />
            <SidebarDropdown
              text={
                <>
                  <figure className="p-0 m-0 text-center">
                    <h1 className="display-1">
                      <FcViewDetails />
                    </h1>
                    <h6 className="text-dark fw-medium">Miscellaneous</h6>
                  </figure>
                </>
              }
              reference={"#Miscellaneous"}
              referenced={"Miscellaneous"}
              parent={"#menu"}
              itemlist={
                <main className="d-flex flex-column gap-2">
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
                </main>
              }
            />
          </main>
        </main>
        {/*
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
        */}
      </main>
    );
  }
}
