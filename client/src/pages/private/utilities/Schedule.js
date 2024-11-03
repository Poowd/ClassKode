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
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";

export function Schedule() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [isLoading, setIsLoading] = useState(true);

  const [sched, setSched] = useState([]);
  const [convertMinutes] = useTimeFormat();

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
        sidepanel={<NoDisplay />}
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
                <DefaultInput placeholder="Search" />
                <DefaultDropdown
                  class="border px-2 btn-primary rounded"
                  reversed={true}
                  icon={info.icons.pages.utilities.schedule}
                  text={"Load"}
                  dropdownitems={
                    <>
                      <DefaultDropdownItem
                        title={"Room"}
                        trigger={() => navigate("/utilities/schedule/room")}
                      />
                      <DefaultDropdownItem
                        title={"Coach"}
                        trigger={() => navigate("/utilities/schedule/coach")}
                      />
                      <DefaultDropdownItem
                        title={"Section"}
                        trigger={() => navigate("/utilities/schedule/section")}
                      />
                    </>
                  }
                />
                <LinkButton
                  to={"/schedule/generate/0"}
                  class="btn-primary"
                  textclass="text-white"
                  icon={info.icons.forms.generate}
                />
                <LinkButton
                  to={"/schedule/create/0"}
                  class="btn-primary"
                  textclass="text-white"
                  icon={info.icons.forms.add}
                />
              </div>
            </div>
          </>
        }
        list={
          <>
            {sched.length > 0
              ? sched.map((sc, i) => (
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
                          {sc.Room === null
                            ? "Court"
                            : `${sc.Room} ( ${sc.Population}/${sc.Capacity} Students )`}
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
                    link={null}
                    state={null}
                    custom={
                      <>
                        <LinkButton
                          to={`/schedule/edit/${sc.CLSID}`}
                          class="btn-warning"
                          textclass=""
                          icon={info.icons.forms.edit}
                        />
                      </>
                    }
                  />
                ))
              : "none"}
          </>
        }
      />
    </>
  );
}
