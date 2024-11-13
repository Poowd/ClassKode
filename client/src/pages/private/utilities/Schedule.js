import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { ScheduleList } from "../../../component/card/ScheduleList";
import useDatabase from "../../../hook/useDatabase";
import useTimeFormat from "../../../hook/useTimeFormat";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";
import useHandleChange from "../../../hook/useHandleChange";

export function Schedule() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [isLoading, setIsLoading] = useState(true);

  const [sched, setSched] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [search, setSearch] = useState({
    Search: "",
    setbyDay: "",
    setbyComponent: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const DaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const AvailableComponent = ["Lecture", "Laboratory", "NSTP", "PE"];

  useEffect(() => {
    data_get("class-schedule-list", setSched);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <FileMaintainanceTemplate
        loader={isLoading}
        sidepanel={
          <>
            <main className="w-100">
              <section className="w-100 bg-white rounded m p-2">
                <header className="mb-2">
                  <h6>Loadings</h6>
                </header>
                <main className="d-flex flex-column gap-2">
                  <DefaultButton
                    class="w-100 border py-2"
                    text="Room Loading"
                    function={() => navigate("/utilities/schedule/room")}
                  />
                  <DefaultButton
                    class="w-100 border py-2"
                    text="Coach Loading"
                    function={() => navigate("/utilities/schedule/coach")}
                  />
                  <DefaultButton
                    class="w-100 border py-2"
                    text="Section Loading"
                    function={() => navigate("/utilities/schedule/section")}
                  />
                </main>
              </section>
            </main>
          </>
        }
        control={
          <>
            <div className="w-100">
              <div className="d-flex gap-2 justify-content-end">
                <DefaultButton
                  class="px-2"
                  icon={info.icons.navigation.back}
                  text="Back"
                  function={() => navigate(-1)}
                />
                <DefaultInput
                  placeholder="Search"
                  id="Search"
                  trigger={dataChange}
                />
                <DefaultDropdown
                  class="border p-2"
                  reversed={true}
                  icon={info.icons.forms.filter}
                  dropdownitems={
                    <main className="d-flex gap-3 p-3">
                      <section>
                        <h6>Academic Level</h6>
                        {DaysOfWeek.map((day, i) => (
                          <DefaultDropdownItem
                            title={day}
                            trigger={() =>
                              setSearch((prev) => ({
                                ...prev,
                                setbyDay: day,
                              }))
                            }
                          />
                        ))}
                      </section>
                      <section>
                        <h6>Component</h6>
                        {AvailableComponent.map((component, i) => (
                          <DefaultDropdownItem
                            title={component}
                            trigger={() =>
                              setSearch((prev) => ({
                                ...prev,
                                setbyComponent: component,
                              }))
                            }
                          />
                        ))}
                      </section>
                    </main>
                  }
                />
                <LinkButton
                  to={"/schedule/create/0"}
                  class="btn-outline-primary"
                  icon={info.icons.forms.add}
                />
                <LinkButton
                  to={"/schedule/generate/0"}
                  class="btn-primary px-2"
                  text="Generate"
                  icon={info.icons.forms.generate}
                />
              </div>
            </div>
          </>
        }
        list={
          <>
            <section>
              <ul className="p-0 m-0 mb-2 d-flex gap-2 flex-wrap">
                <li className={search.Search === "" ? "visually-hidden" : ""}>
                  <DefaultButton
                    class="btn-outline-primary px-2"
                    text={search.Search}
                    function={() => {
                      document.getElementById(`Search`).value = "";
                      setSearch((prev) => ({
                        ...prev,
                        Search: "",
                      }));
                    }}
                  />
                </li>
                <li className={search.setbyDay === "" ? "visually-hidden" : ""}>
                  <DefaultButton
                    class="btn-outline-primary px-2"
                    text={search.setbyDay}
                    function={() =>
                      setSearch((prev) => ({
                        ...prev,
                        setbyDay: "",
                      }))
                    }
                  />
                </li>
                <li
                  className={
                    search.setbyComponent === "" ? "visually-hidden" : ""
                  }
                >
                  <DefaultButton
                    class="btn-outline-primary px-2"
                    text={search.setbyComponent}
                    function={() =>
                      setSearch((prev) => ({
                        ...prev,
                        setbyComponent: "",
                      }))
                    }
                  />
                </li>
              </ul>
            </section>
            {sched.length > 0
              ? sched.map((sc, i) =>
                  search.Search === "" ||
                  sc.FirstName.toLowerCase().includes(
                    search.Search.toLowerCase()
                  ) ? (
                    search.setbyDay === "" || search.setbyDay === sc.Day ? (
                      search.setbyComponent === "" ||
                      sc.Component.includes(search.setbyComponent) ? (
                        <ScheduleList
                          key={i}
                          slot1={sc.Section}
                          slot2={sc.Course}
                          slot3={
                            <main>
                              <section>
                                {`${sc.Day}, ${convertMinutes(
                                  sc.StartTime
                                )} - ${convertMinutes(sc.EndTime)} `}
                              </section>
                              <section>
                                {`${sc.Room} ( ${sc.Population} : ${sc.Capacity} Students )`}
                              </section>
                            </main>
                          }
                          slot4={null}
                          slot5={
                            sc.FirstName !== null && sc.LastName !== null
                              ? `${sc.LastName}, ${sc.FirstName}`
                              : "No Coach"
                          }
                          slot6={sc.Component + " ( " + sc.Units + " Units )"}
                          custom={
                            <>
                              <LinkButton
                                to={`/schedule/edit/${sc.CLSID}`}
                                class="bg-warning px-2"
                                icon={info.icons.forms.edit}
                              />
                            </>
                          }
                        />
                      ) : null
                    ) : null
                  ) : null
                )
              : "none"}
          </>
        }
      />
    </>
  );
}
