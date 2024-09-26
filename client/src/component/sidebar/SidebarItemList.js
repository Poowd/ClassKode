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
        <main className="h-100 w-100 bg-white shadow-sm rounded">
          <main className="row h-100 m-0 p-0 p-lg-2">
            <section className="col-4 m-0 p-0">
              <ul className="h-100 overflow-y-auto m-0 p-1 d-flex flex-column gap-2">
                {this.props.list}
              </ul>
            </section>
            <section className="col-8 m-0 p-0 overflow-y-auto">
              <main className="d-flex align-content-start flex-wrap gap-2 justify-content-start px-1">
                {this.props.items}
              </main>
            </section>
          </main>
          {/* <main className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-lg-100 gap-5 p-0 m-0 border">
            <section className="w-100 p-3 border">
              
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
                </>
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
                <>
                  <SidebarDropdownItem
                    icon={<FcTimeline />}
                    navigate={"/utilities/schedule"}
                    text={"Schedule"}
                  />
                </>
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
                <>
                  <SidebarDropdownItem
                    icon={<FcSurvey />}
                    navigate={"/utilities/locator"}
                    text={"Faculty Locator"}
                  />
                </>
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
          </main> */}
        </main>
      </main>
    );
  }
}
