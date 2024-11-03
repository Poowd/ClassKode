import React, { useEffect, useState } from "react";
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
import { SidebarDropdown } from "../sidebar/SidebarDropdown";
import { SidebarItem } from "../sidebar/SidebarItem";
import useDatabase from "../../hook/useDatabase";
import { CoffeeLoader } from "../loader/CoffeeLoader";

export function SuperAdminTopbar() {
  const dateObject = new Date();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [logs, setLogs] = useState("");
  const [account, setAccount] = useState([]);
  const [checkstatus, setCheckStatus] = useState(false);
  const [data, setData] = useState({
    Input: "",
  });
  const [dataChange] = useHandleChange(setData);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    // Simulate an API call
    getCookies();
  }, []);

  const unSetCookie = () => {
    document.cookie = "accountCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  const getCookies = () => {
    try {
      const cookies = document.cookie.split(";");
      const cookieMap = {};
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookieMap[name] = value;
      });
      const cookieVal = cookieMap["accountCookies"];
      setAccount(JSON.parse(cookieVal));
      setCheckStatus(true);
    } catch (error) {
      return false;
    }
  };

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
      unSetCookie();
      window.location.assign("/");
    }, 1000);
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
    if (/department [A-Z0-9]{15}/g.test(data.Input)) {
      navigate(`/coach/view/${data.Input.slice(6)}`);
    }
    document.getElementById("Input").value = "";
    setData({ Input: "" });
  };

  return (
    <>
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
                      <div className="m-0 p-0 d-flex justify-content-between align-items-start">
                        <Link to={"/"} className="">
                          <div className="">
                            <img
                              src={Logo}
                              alt="..."
                              className="img-fluid"
                              style={{
                                height: "5em",
                              }}
                            />
                          </div>
                        </Link>
                        <div className="d-flex align-items-center py-2">
                          <DefaultButton
                            type="button"
                            class="bg-white rounded-pill py-2 "
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
                            <main className="w-100 bg-white rounded shadow-sm p-2">
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
                            </main>
                          </>
                        }
                      />
                      <SidebarItem
                        class={"fw-medium w-100"}
                        classlink={"py-2"}
                        icon={info.icons.modules.curriculum}
                        navigate={"/utilities/curriculum"}
                        text={"Curriculum"}
                      />
                      <SidebarItem
                        class={"fw-medium w-100"}
                        classlink={"py-2"}
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
                            <main className="w-100 bg-white rounded shadow-sm p-2">
                              <SidebarItem
                                icon={info.icons.modules.schedules}
                                navigate={"/utilities/schedule"}
                                text={"Class Schedules"}
                              />
                              <SidebarItem
                                icon={info.icons.modules.schedules}
                                navigate={"/utilities/examinations"}
                                text={"Examination Schedules"}
                              />
                            </main>
                          </>
                        }
                      />
                      <SidebarItem
                        class={"fw-medium w-100"}
                        classlink={"py-2"}
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
                            <main className="w-100 bg-white rounded shadow-sm p-2">
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
                            </main>
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
        <div className="d-flex align-items-center">
          <section className="d-flex gap-1 border-end px-1">
            <DefaultInput
              class="bg-transparent border-0"
              autocomplete={false}
              label="inputs"
              id="Input"
              name="Input"
              placeholder="Quick Navigation"
              trigger={dataChange}
            />
            <DefaultButton
              class="text-light"
              reversed={true}
              icon={info.icons.navigation.quicknav}
              function={quicknav}
            />
          </section>
          {/* <div>
          <DefaultButton
            class="text-light"
            reversed={false}
            icon={info.icons.navigation.quicknav}
            text={""}
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
        </div> */}
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
    </>
  );
}
