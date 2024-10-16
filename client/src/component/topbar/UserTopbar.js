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

export function UserTopbar() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [data, setData] = useState({
    Input: "",
  });
  const [dataChange] = useHandleChange(setData);

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const [itemlist, setItemList] = useState("Default");
  const [items, setItems] = useState({
    Scheduler: [
      <SidebarDropdownItem
        icon={info.icons.modules.section}
        navigate={"/section-schedules"}
        text={"Section Schedules"}
      />,
      <SidebarDropdownItem
        icon={info.icons.modules.coach}
        navigate={"/my-schedules"}
        text={"My Schedules"}
      />,
    ],
    Locator: [
      <SidebarDropdownItem
        icon={info.icons.modules.locator}
        navigate={"/faculty-locator"}
        text={"Faculty Locator"}
      />,
    ],
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loggedin");
    navigate("/");
    //window.location.reload(true);
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
                items={
                  itemlist && itemlist === "Default" ? (
                    <main className="w-100 h-100 text-center p-3"></main>
                  ) : itemlist === "Scheduler" ? (
                    items.Scheduler.map((item) => (
                      <div className="bg-white rounded shadow-sm">{item}</div>
                    ))
                  ) : itemlist === "Locator" ? (
                    items.Locator.map((item) => (
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
      <div className="d-flex align-items-center gap-2">
        <div>
          <DefaultButton
            class="text-light"
            reversed={false}
            icon={info.icons.navigation.quicknav}
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
