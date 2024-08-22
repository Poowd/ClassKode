import React, { useEffect, useState } from "react";
import { PlotButton } from "../../../../component/button/PlotButton";
import useModal from "../../../../hook/useModal";
import useTimeFormat from "../../../../hook/useTimeFormat";
import useDatabase from "../../../../hook/useDatabase";
import { ViewModal } from "../../../../component/modal/ViewModal";
import { RoomCard } from "../../../../component/card/RoomCard";

export function A1() {
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [schedule, setSchedule] = useState([]);
  const [placement, setPlacement] = useState([]);
  const [convertMinutes] = useTimeFormat();
  useEffect(() => {
    post("sel-sched", schedule, setSchedule);
    post("sel-place", placement, setPlacement);
  }, []);
  return (
    <div className="h-100 row m-0 p-0 border rounded p-1">
      <div className="col-2 m-0 p-0"></div>
      <div className="col-8 m-0 p-0">
        <div className="h-100 row m-0 p-2">
          <div className="col-6 m-0 p-0">
            <div className="h-100 row m-0 p-0">
              <div className="col-5 m-0 p-0">
                <div className="h-100 border rounded p-1">
                  {/* a-1-1 */}
                  {placement.length > 0
                    ? placement.map((place, i) =>
                        place.PLC_Code === "a-1-1" ? (
                          <PlotButton
                            class="border"
                            text={place.Room}
                            capacity={place.Capacity}
                            function={() =>
                              showModal(
                                "Modal",
                                place.Room,
                                <>
                                  {schedule.map((sc, i) =>
                                    sc.Room === place.Room ? (
                                      <>
                                        <RoomCard
                                          section={sc.Section}
                                          course={sc.Course}
                                          time={
                                            sc.Day +
                                            " " +
                                            convertMinutes(sc.StartTime) +
                                            " - " +
                                            convertMinutes(sc.EndTime)
                                          }
                                        />
                                      </>
                                    ) : null
                                  )}
                                </>
                              )
                            }
                          />
                        ) : null
                      )
                    : null}
                </div>
              </div>
              <div className="col-1 m-0 p-0"></div>
              <div className="col-6 m-0 p-0">
                <div className="h-100 p-0 m-0">
                  <div className="h-25 p-0 m-0 pb-1">
                    <div className="h-100 border rounded p-1"></div>
                  </div>
                  <div className="h-75 p-0 m-0">
                    <div className="h-50 p-0 m-0 pb-1">
                      <div className="h-100 border rounded p-1">
                        {/* a-1-2 */}
                        {placement.length > 0
                          ? placement.map((place, i) =>
                              place.PLC_Code === "a-1-2" ? (
                                <PlotButton
                                  class="border"
                                  text={place.Room}
                                  capacity={place.Capacity}
                                  function={() =>
                                    showModal(
                                      "Modal",
                                      place.Room,
                                      <>
                                        {schedule.map((sc, i) =>
                                          sc.Room === place.Room ? (
                                            <>
                                              <RoomCard
                                                section={sc.Section}
                                                course={sc.Course}
                                                time={
                                                  sc.Day +
                                                  " " +
                                                  convertMinutes(sc.StartTime) +
                                                  " - " +
                                                  convertMinutes(sc.EndTime)
                                                }
                                              />
                                            </>
                                          ) : null
                                        )}
                                      </>
                                    )
                                  }
                                />
                              ) : null
                            )
                          : null}
                      </div>
                    </div>
                    <div className="h-25 p-0 m-0 pb-1">
                      <div className="h-100 border rounded p-1">
                        {/* a-1-3 */}
                        {placement.length > 0
                          ? placement.map((place, i) =>
                              place.PLC_Code === "a-1-3" ? (
                                <PlotButton
                                  class="border"
                                  text={place.Room}
                                  capacity={place.Capacity}
                                  function={() =>
                                    showModal(
                                      "Modal",
                                      place.Room,
                                      <>
                                        {schedule.map((sc, i) =>
                                          sc.Room === place.Room ? (
                                            <>
                                              <RoomCard
                                                section={sc.Section}
                                                course={sc.Course}
                                                time={
                                                  sc.Day +
                                                  " " +
                                                  convertMinutes(sc.StartTime) +
                                                  " - " +
                                                  convertMinutes(sc.EndTime)
                                                }
                                              />
                                            </>
                                          ) : null
                                        )}
                                      </>
                                    )
                                  }
                                />
                              ) : null
                            )
                          : null}
                      </div>
                    </div>
                    <div className="h-25 p-0 m-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 m-0 p-0"></div>
          <div className="col-5 m-0 p-0">
            <div className="h-100 p-0 m-0">
              <div className="h-25 p-0 m-0 pb-1">
                <div className="h-100 border rounded p-1"></div>
              </div>
              <div className="h-75 p-0 m-0">
                <div className="h-75 p-0 m-0 pb-1">
                  <div className="h-100 border rounded p-1">
                    {/* a-1-4 */}
                    {placement.length > 0
                      ? placement.map((place, i) =>
                          place.PLC_Code === "a-1-4" ? (
                            <PlotButton
                              class="border"
                              text={place.Room}
                              capacity={place.Capacity}
                              function={() =>
                                showModal(
                                  "Modal",
                                  place.Room,
                                  <>
                                    {schedule.map((sc, i) =>
                                      sc.Room === place.Room ? (
                                        <>
                                          <RoomCard
                                            section={sc.Section}
                                            course={sc.Course}
                                            time={
                                              sc.Day +
                                              " " +
                                              convertMinutes(sc.StartTime) +
                                              " - " +
                                              convertMinutes(sc.EndTime)
                                            }
                                          />
                                        </>
                                      ) : null
                                    )}
                                  </>
                                )
                              }
                            />
                          ) : null
                        )
                      : null}
                  </div>
                </div>
                <div className="h-25 p-0 m-0">
                  <div className="h-100 row m-0 p-0">
                    <div className="col-2 p-0 m-0"></div>
                    <div className="col-10 p-0 m-0 border rounded p-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 m-0 p-0"></div>
      <ViewModal
        id={"Modal"}
        title={modalcontent.Title}
        content={<>{modalcontent.Content}</>}
      />
    </div>
  );
}
