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
import owie from "../../assets/imgs/misc/owie.png";
import Logo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import { SidebarItem } from "../sidebar/SidebarItem";
import { SidebarDropdown } from "../sidebar/SidebarDropdown";
import useDatabase from "../../hook/useDatabase";

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
    <nav className="main-top-bar gradient-bg-blue">
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
                      text={"Homepage"}
                    />
                    <SidebarDropdown
                      class={"fw-medium w-100 py-1"}
                      icon={info.icons.modules.schedules}
                      reference={"#schedule"}
                      text={"Schedule"}
                      referenced={"schedule"}
                      parent={"#menu"}
                      itemlist={
                        <>
                          <SidebarItem
                            icon={info.icons.modules.schedules}
                            navigate={"/my-schedules"}
                            text={"My Schedules"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.schedules}
                            navigate={"/section-schedules"}
                            text={"Class Schedules"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.schedules}
                            navigate={"/schedule"}
                            text={"Examination Schedules"}
                          />
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
                  </>
                }
              />
            }
          />
        </div>
        <div className="d-flex gap-2">
          <h5 className="p-0 m-0">
            <span className="fw-bold gradient-text-golden">ClassKode</span>
          </h5>
          <div>
            <p className="p-0 m-0">
              <span className="fw-semibold gradient-text-1">User</span>
            </p>
          </div>
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
        <div className="px-1">
          <DefaultButton
            class="text-light"
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
                <main className="w-100 bottom-0 end-0 d-flex align-items-center justify-content-end">
                  <section className="w-100 p-0 m-0 border rounded-pill p-2 px-3 text-dark">
                    <p className="p-0 m-0">Are you leaving ?</p>
                  </section>
                  <img
                    src={owie}
                    alt="..."
                    className=""
                    style={{ height: "10em" }}
                  />
                </main>
                <DefaultButton
                  class="w-100 btn-danger py-2"
                  reversed={true}
                  icon={<PiQuestionMarkBold />}
                  text="Logout"
                  function={handleLogout}
                  dismiss={"modal"}
                />
              </>
            }
          />
        </div>
      </div>
    </nav>
  );
}
