import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultButton } from "../../../component/button/DefaultButton";
import "./Map.css";
import { Link, useNavigate } from "react-router-dom";
import { ScheduleList } from "../../../component/card/ScheduleList";
import useDatabase from "../../../hook/useDatabase";
import useTimeFormat from "../../../hook/useTimeFormat";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import useConfiguration from "../../../hook/useConfiguration";

export function Schedule() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [sched, setSched] = useState([]);
  const [convertMinutes] = useTimeFormat();

  useEffect(() => {
    data_get("class-schedule-list", setSched);
  }, [sched]);
  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={<NoDisplay />}
        control={
          <>
            <div className="w-100">
              <div className="d-flex gap-2 justify-content-end">
                <DefaultButton
                  class=""
                  icon={info.icons.navigation.back}
                  function={() => navigate(-1)}
                />
                <DefaultInput placeholder="Search" />
                <DefaultDropdown
                  class="border px-2 btn-primary"
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
                <Link to={"/schedule/generate/0"}>
                  <DefaultButton
                    class="btn-primary"
                    icon={info.icons.forms.generate}
                  />
                </Link>
                <Link to={"/schedule/create/0"}>
                  <DefaultButton
                    class="btn-primary"
                    icon={info.icons.forms.add}
                  />
                </Link>
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
                      sc.Day +
                      " : " +
                      convertMinutes(sc.StartTime) +
                      " - " +
                      convertMinutes(sc.EndTime)
                    }
                    slot4={
                      sc.Room === null
                        ? "Court"
                        : sc.Room + " " + sc.Population + "/" + sc.Capacity
                    }
                    slot5={sc.Coach}
                    slot6={sc.Component + " ( " + sc.Units + " )"}
                    link={null}
                    state={null}
                    custom={null}
                  />
                ))
              : "none"}
          </>
        }
      />
    </>
  );
}
