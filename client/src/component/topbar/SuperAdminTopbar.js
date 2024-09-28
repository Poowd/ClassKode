import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { PiQuestionMarkBold } from "react-icons/pi";
import { Sidebar } from "../sidebar/Sidebar";
import { SidebarItemList } from "../sidebar/SidebarItemList";
import { ViewModal } from "../modal/ViewModal";
import useConfiguration from "../../hook/useConfiguration";
import { Link, useNavigate } from "react-router-dom";
import useHandleChange from "../../hook/useHandleChange";
import { DefaultInput } from "../input/DefaultInput";
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
import { SidebarDropdownItem } from "../dropdown/sidebar/SidebarDropdownItem";
import { NoDisplay } from "../placeholder/NoDisplay";

export function SuperAdminTopbar() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [data, setData] = useState({
    Input: "",
  });
  const [dataChange] = useHandleChange(setData);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const [itemlist, setItemList] = useState("Default");
  const [items, setItems] = useState({
    Institution: [
      <SidebarDropdownItem
        icon={info.icons.modules.department}
        navigate={"/institution/department"}
        text={"Department"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.program}
        navigate={"/institution/program"}
        text={"Program"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.course}
        navigate={"/institution/course"}
        text={"Course"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.coach}
        navigate={"/institution/coach"}
        text={"Coach"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.section}
        navigate={"/institution/section"}
        text={"Section"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.room}
        navigate={"/institution/room"}
        text={"Room"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.curriculum}
        navigate={"/utilities/curriculum"}
        text={"Curriculum"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.academicyear}
        navigate={"/utilities/academicyear"}
        text={"Academic Year"}
      />,
    ],
    Scheduler: [
      <SidebarDropdownItem
        icon={info.icons.modules.schedules}
        navigate={"/utilities/schedule"}
        text={"Schedule"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.room}
        navigate={"/utilities/schedule/room"}
        text={"Room Schedules"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.section}
        navigate={"/utilities/schedule/section"}
        text={"Section Schedules"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.coach}
        navigate={"/utilities/schedule/coach"}
        text={"Coach Schedules"}
      />,
    ],
    Locator: [
      <SidebarDropdownItem
        icon={info.icons.modules.locator}
        navigate={"/utilities/locator"}
        text={"Faculty Locator"}
      />,
    ],
    Misc: [
      <SidebarDropdownItem
        icon={info.icons.modules.archives}
        navigate={"/miscellaneous/archive"}
        text={"Archive"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.logs}
        navigate={"/miscellaneous/log"}
        text={"Log"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.users}
        navigate={"/miscellaneous/user"}
        text={"User"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.settings}
        navigate={"/miscellaneous/setup"}
        text={"Setup"}
      />,
    ],
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loggedin");
    navigate("/");
    window.location.reload(true);
  };

  const quicknav = () => {
    switch (`${data.Input}`) {
      case "list department":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list program":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list course":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list coach":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list section":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      case "list room":
        navigate(`/institution/${data.Input.slice(5)}`);
        break;
      default:
        navigate("/");
    }
    document.getElementById("Input").value = "";
    setData({ Input: "" });
  };

  return (
    <nav className="main-top-bar gradient-bg-blue">
      <div className="d-flex align-items-center gap-2">
        <div>
          <DefaultButton
            class="text-white"
            icon={info.icons.navigation.menu}
            toggle={"offcanvas"}
            target={"#sidebar"}
          />
          <Sidebar
            id={"sidebar"}
            content={
              <SidebarItemList
                items={
                  itemlist && itemlist === "Default" ? (
                    <main className="w-100 text-center p-3">
                      Select a Category
                    </main>
                  ) : itemlist === "Institution" ? (
                    items.Institution.map((item) => (
                      <div className="bg-white rounded shadow-sm">{item}</div>
                    ))
                  ) : itemlist === "Scheduler" ? (
                    items.Scheduler.map((item) => (
                      <div className="bg-white rounded shadow-sm">{item}</div>
                    ))
                  ) : itemlist === "Locator" ? (
                    items.Locator.map((item) => (
                      <div className="bg-white rounded shadow-sm">{item}</div>
                    ))
                  ) : itemlist === "Misc" ? (
                    items.Misc.map((item) => (
                      <div className="bg-white rounded shadow-sm">{item}</div>
                    ))
                  ) : null
                }
                list={
                  <>
                    <li>
                      <button
                        className="w-100 btn border-0 d-flex align-items-center gap-2 p-3 bg-white m-0 text-dark fw-medium rounded shadow-sm"
                        onClick={() => {
                          navigate("/");
                        }}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <h3 className="">{info.icons.modules.dashboard}</h3>
                        <h6 className="text-start flex-grow-1">Dashboard</h6>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-100 btn border-0 d-flex align-items-center gap-2 p-3 bg-white m-0 text-dark fw-medium rounded shadow-sm"
                        onClick={() => {
                          setItemList("Institution");
                        }}
                      >
                        <h3 className="">{info.icons.modules.institution}</h3>
                        <h6 className="text-start flex-grow-1">Institution</h6>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-100 btn border-0 d-flex align-items-center gap-2 p-3 bg-white m-0 text-dark fw-medium rounded shadow-sm"
                        onClick={() => {
                          setItemList("Scheduler");
                        }}
                      >
                        <h3 className="">{info.icons.modules.scheduler}</h3>
                        <h6 className="text-start flex-grow-1">Scheduler</h6>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-100 btn border-0 d-flex align-items-center gap-2 p-3 bg-white m-0 text-dark fw-medium rounded shadow-sm"
                        onClick={() => {
                          setItemList("Locator");
                        }}
                      >
                        <h3 className="">{info.icons.modules.locator}</h3>
                        <h6 className="text-start flex-grow-1">Locator</h6>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-100 btn border-0 d-flex align-items-center gap-2 p-3 bg-white m-0 text-dark fw-medium rounded shadow-sm"
                        onClick={() => {
                          setItemList("Misc");
                        }}
                      >
                        <h3 className="">{info.icons.modules.misc}</h3>
                        <h6 className="text-start flex-grow-1">Misc</h6>
                      </button>
                    </li>
                  </>
                }
              />
            }
          />
        </div>
        <div className="d-flex">
          <h5 className="p-0 m-0 d-flex align-items-center text-white custom-text-gradient-dark">
            <span className="fw-bold">Class</span>
            <span> </span>
            <span className="fw-light">Kode</span>
          </h5>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div>
          <DefaultButton
            class="text-white"
            reversed={false}
            icon={info.icons.navigation.quicknav}
            text={"Commands"}
            function={() => {}}
            toggle="modal"
            target="#QuickNav"
          />
          <ViewModal
            id={"QuickNav"}
            title={<h6 className="text-center text-black">Quick Navigation</h6>}
            content={
              <main>
                <section className="d-flex gap-1">
                  <DefaultInput
                    label="inputs"
                    id="Input"
                    name="Input"
                    trigger={dataChange}
                  />
                  <DefaultButton
                    class="btn-danger py-2 px-2"
                    reversed={true}
                    text="Enter"
                    function={quicknav}
                  />
                </section>
              </main>
            }
          />
        </div>
        <div>
          <DefaultButton
            class="text-white"
            icon={info.icons.others.help}
            text={"Guide"}
          />
        </div>
        <span>|</span>
        <div>
          <DefaultButton
            class="text-white"
            icon={info.icons.others.hiddenuser}
            text={`${loggeduser.LastName}, ${loggeduser.FirstName}`}
            function={() => {}}
            toggle="modal"
            target="#MenuModal"
          />
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
                  function={handleLogout}
                />
              </>
            }
          />
        </div>
      </div>
    </nav>
  );
}
