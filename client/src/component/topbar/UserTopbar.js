import React, { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import { PiQuestionMarkBold } from "react-icons/pi";
import { Sidebar } from "../sidebar/Sidebar";
import { SidebarItemList } from "../sidebar/SidebarItemList";
import { SidebarDropdown } from "../sidebar/SidebarDropdown";
import { ViewModal } from "../modal/ViewModal";
import useConfiguration from "../../hook/useConfiguration";
import { Link, useNavigate } from "react-router-dom";
import useHandleChange from "../../hook/useHandleChange";
import owie from "../../assets/imgs/misc/owie.png";
import Logo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import { SidebarItem } from "../sidebar/SidebarItem";
import useDatabase from "../../hook/useDatabase";
import { FaUserCircle } from "react-icons/fa";
import { StatusModal } from "../modal/StatusModal";

export function UserTopbar() {
  const dateObject = new Date();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [data, setData] = useState({
    Input: "",
  });
  const [logs, setLogs] = useState("");
  const [dataChange] = useHandleChange(setData);

  const unSetCookie = () => {
    document.cookie = "accountCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const [itemlist, setItemList] = useState("Default");

  const handleLogout = () => {
    data_post(
      "log-me",
      {
        Action: "Logout",
        Module: "Web-Application",
        User: loggeduser.SCHLID,
        Details: "A User has Logged-Out",
        Date: `${dateObject.getMonth()}-${dateObject.getDate()}-${dateObject.getFullYear()}`,
        Time: `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`,
      },
      setLogs
    );
    setTimeout(() => {
      sessionStorage.removeItem("loggedin");
      sessionStorage.removeItem("user");
      unSetCookie();
      window.location.assign("/");
    }, 1000);
  };
  const quicknav = () => {
    //=>
    // if (/coach [0-9]{11}/g.test(data.Input)) {
    //   navigate(`/coach/view/${data.Input.slice(6)}`);
    // }
    document.getElementById("Input").value = "";
    setData({ Input: "" });
  };

  return (
    <nav className="main-top-bar topbar-gradient">
      <div className="d-flex align-items-center gap-2">
        <div className="">
          <DefaultButton
            class="text-light"
            icon={info.icons.navigation.menu}
            toggle={"offcanvas"}
            target={"#sidebar"}
          />
          <Sidebar
            id={"sidebar"}
            content={
              <SidebarItemList
                list={
                  <>
                    <div className="m-0 p-0 d-flex justify-content-between">
                      <Link to={"/"} className="">
                        <div className="">
                          <img
                            src={Logo}
                            alt="..."
                            className="img-fluid"
                            style={{ height: "5em" }}
                          />
                        </div>
                      </Link>
                      <div className="d-flex align-items-center py-2">
                        <DefaultButton
                          type="button"
                          class="bg-white rounded-pill py-2 border border-dark"
                          icon={info.icons.navigation.close}
                          dismiss="offcanvas"
                        />
                      </div>
                    </div>
                    <hr />

                    <SidebarItem
                      class={"fw-medium w-100"}
                      classlink={"py-2"}
                      icon={info.icons.modules.dashboard}
                      navigate={"/"}
                      text={"Home"}
                    />
                    <SidebarDropdown
                      icon={info.icons.modules.schedules}
                      reference={"#schedules"}
                      text={"Schedules"}
                      referenced={"schedules"}
                      parent={"#menu"}
                      itemlist={
                        <>
                          <main className="w-100 bg-white rounded shadow-sm p-2">
                            <SidebarItem
                              icon={info.icons.modules.schedules}
                              navigate={"/my-schedules"}
                              text={"My Schedules"}
                            />
                            <SidebarItem
                              icon={info.icons.modules.schedules}
                              navigate={"/my-examinations"}
                              text={"My Examinations"}
                            />
                          </main>
                        </>
                      }
                    />
                    <SidebarItem
                      class={"fw-medium w-100"}
                      classlink={"py-2"}
                      icon={info.icons.modules.locator}
                      navigate={"/faculty-locator"}
                      text={"Faculty Locator"}
                    />
                    {loggeduser.PermissionLevel == 1 ? (
                      <SidebarItem
                        class={"fw-medium w-100"}
                        classlink={"py-2"}
                        icon={info.icons.modules.locator}
                        navigate={"/room-availability"}
                        text={"Room Availability"}
                      />
                    ) : null}
                    <SidebarItem
                      class={"fw-medium w-100"}
                      classlink={"py-2"}
                      icon={info.icons.modules.department}
                      navigate={"/departments"}
                      text={"STI Departments"}
                    />
                  </>
                }
              />
            }
          />
        </div>
        <div className="d-flex gap-2">
          <h5 className="p-0 m-0">
            <span className="fw-bold gold-text">ClassKode</span>
          </h5>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="px-1 border-end">
          <DefaultButton
            class="text-light"
            icon={info.icons.others.help}
            function={() => {}}
          />
        </div>
        <div className="px-1 ms-2">
          <main className="d-flex gap-1">
            <DefaultButton
              class="text-white border-0"
              text={`${loggeduser.LastName}, ${loggeduser.FirstName}`}
              function={() => {}}
              toggle="modal"
              target="#MenuModal"
            />
            <div className="rounded-circle user-text">
              <FaUserCircle />
            </div>
          </main>
          <StatusModal
            id={"MenuModal"}
            title={<h6 className="text-center text-black">Kwa-Goodbye</h6>}
            content={
              <main className="">
                <main className="w-100 mb-3 p-0 m-0 d-flex flex-column align-items-center">
                  <img
                    src={owie}
                    alt="..."
                    className=""
                    style={{ height: "10em" }}
                  />
                  <h3 className="primary-text fw-bold">Are you leaving?</h3>
                </main>
                <section className="d-flex gap-2">
                  <DefaultButton
                    class="w-auto primary-outline-gradient py-2 px-3"
                    reversed={true}
                    text="No"
                    function={() => {}}
                    dismiss={"modal"}
                  />
                  <DefaultButton
                    class="w-100 primary-gradient py-2"
                    reversed={true}
                    text="Yes"
                    function={handleLogout}
                    dismiss={"modal"}
                  />
                </section>
              </main>
            }
          />
        </div>
      </div>
    </nav>
  );
}
