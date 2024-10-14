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
import { SidebarDropdownItem } from "../dropdown/sidebar/SidebarDropdownItem";
import owie from "../../assets/imgs/misc/owie.png";
import Logo from "../../assets/imgs/logo/ClassKode Logo (1).png";
import { SidebarDropdown } from "../sidebar/SidebarDropdown";
import { SidebarItem } from "../sidebar/SidebarItem";

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
    Institution: [],
    Scheduler: [],
    Locator: [],
    Misc: [],
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loggedin");
    navigate("/");
    //window.location.reload(true);
  };

  const quicknav = () => {
    if (/list department/g.test(data.Input)) {
      navigate(`/institution/department`);
    }
    if (/list program/g.test(data.Input)) {
      navigate(`/institution/program`);
    }
    if (/list course/g.test(data.Input)) {
      navigate(`/institution/course`);
    }
    if (/list coach/g.test(data.Input)) {
      navigate(`/institution/coach`);
    }
    if (/list section/g.test(data.Input)) {
      navigate(`/institution/section`);
    }
    if (/list room/g.test(data.Input)) {
      navigate(`/institution/room`);
    }
    //=>
    if (/coach [0-9]{11}/g.test(data.Input)) {
      navigate(`/coach/view/${data.Input.slice(6)}`);
    }
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
                      class={"fw-medium w-100 py-2"}
                      icon={info.icons.modules.dashboard}
                      navigate={"/"}
                      text={"Dashboard"}
                    />
                    <SidebarDropdown
                      icon={info.icons.modules.institution}
                      reference={"#institution"}
                      text={"Institution"}
                      referenced={"institution"}
                      parent={"#menu"}
                      itemlist={
                        <>
                          <SidebarItem
                            icon={info.icons.modules.department}
                            navigate={"/institution/department"}
                            text={"Department"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.program}
                            navigate={"/institution/program"}
                            text={"Program"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.course}
                            navigate={"/institution/course"}
                            text={"Course"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.coach}
                            navigate={"/institution/coach"}
                            text={"Coach"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.section}
                            navigate={"/institution/section"}
                            text={"Section"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.room}
                            navigate={"/institution/room"}
                            text={"Room"}
                          />
                        </>
                      }
                    />
                    <SidebarItem
                      class={"fw-medium w-100 py-2"}
                      icon={info.icons.modules.curriculum}
                      navigate={"/utilities/curriculum"}
                      text={"Curriculum"}
                    />
                    <SidebarItem
                      class={"fw-medium w-100 py-2"}
                      icon={info.icons.modules.academicyear}
                      navigate={"/utilities/academicyear"}
                      text={"Academic Year"}
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
                            navigate={"/utilities/schedule"}
                            text={"Class Schedules"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.schedules}
                            navigate={"/utilities/schedule"}
                            text={"Examination Schedules"}
                          />
                        </>
                      }
                    />
                    <SidebarItem
                      class={"fw-medium w-100 py-2"}
                      icon={info.icons.modules.locator}
                      navigate={"/utilities/locator"}
                      text={"Faculty Locator"}
                    />
                    <SidebarDropdown
                      icon={info.icons.modules.misc}
                      reference={"#misc"}
                      text={"Misc"}
                      referenced={"misc"}
                      parent={"#menu"}
                      itemlist={
                        <>
                          <SidebarItem
                            icon={info.icons.modules.archives}
                            navigate={"/miscellaneous/archive"}
                            text={"Archive"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.logs}
                            navigate={"/miscellaneous/log"}
                            text={"Log"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.users}
                            navigate={"/miscellaneous/user"}
                            text={"User"}
                          />
                          <SidebarItem
                            icon={info.icons.modules.settings}
                            navigate={"/miscellaneous/setup"}
                            text={"Setup"}
                          />
                        </>
                      }
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
              <span className="fw-semibold gradient-text-3">Manager</span>
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div>
          <DefaultButton
            class="text-light"
            reversed={false}
            icon={info.icons.navigation.quicknav}
            text={"Commands"}
            function={() => {}}
            toggle="modal"
            target="#QuickNav"
          />
          <ViewModal
            id={"QuickNav"}
            title={<h6 className="text-center text-black">Kwa-Go</h6>}
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
                    class="btn-primary py-2 px-2"
                    reversed={true}
                    text="Enter"
                    function={quicknav}
                    dismiss={"modal"}
                  />
                </section>
                <main className="w-100 bottom-0 end-0 d-flex align-items-center justify-content-end">
                  <section className="w-100 p-0 m-0 border rounded p-2 px-3 text-dark">
                    <p className="p-0 m-0 fw-semibold">Commands</p>
                    <p className="p-0 m-0">
                      list
                      <span className="text-secondary fst-italic">
                        {" "}
                        {`< module >`}
                      </span>
                    </p>
                    <p className="p-0 m-0">
                      <span className="text-secondary fst-italic">
                        {`< module >`} {`< id >`}
                      </span>
                    </p>
                  </section>
                  <img
                    src={owie}
                    alt="..."
                    className=""
                    style={{ height: "10em" }}
                  />
                </main>
              </main>
            }
          />
        </div>
        <div>
          <DefaultButton
            class="text-light"
            icon={info.icons.others.help}
            text={"Guide"}
            function={() => {}}
          />
        </div>
        <span>|</span>
        <div>
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
