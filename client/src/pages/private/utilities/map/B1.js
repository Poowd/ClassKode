import React, { useEffect, useState } from "react";
import { PlotButton } from "../../../../component/button/PlotButton";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";

export function B1() {
  const [get, post] = useDatabase();

  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  useEffect(() => {
    post("schedules", schedule, setSchedule);
  }, [schedule]);
  return (
    <div className="h-100 row m-0 p-0 border rounded p-1">
      <div className="h-25 px-2 pt-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-3 m-0 p-0"></div>
          <div className="col-9 p-0 m-0">
            <div className="h-75 row m-0 p-0">
              <div className="col-3 m-0 p-0">
                <div className="h-100 row m-0 p-0">
                  <div className="col-8 p-0 pe-1 pb-1 m-0">
                    <div className="h-100 border rounded p-1">
                      <PlotButton
                        class="border"
                        text="Clinic"
                        capacity="0"
                        function={(e) =>
                          alert(
                            schedule.map((scd, s) =>
                              scd.Room === "Clinic"
                                ? scd.Course === null
                                  ? scd.CRS_Code
                                  : scd.Course
                                : null
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-4 p-0 pe-1 pb-1 m-0">
                    <div className="h-100 border rounded p-1"></div>
                  </div>
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="107b"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "107b"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="106b"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "106b"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pb-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="105b"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "105b"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="h-25 row m-0 p-0">
              <div className="col-10 p-0 m-0"></div>
              <div className="col-2 p-0 m-0 pb-1">
                <div className="h-100 border rounded p-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-50 px-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-9 p-0 m-0 border rounded p-1">
            <PlotButton
              class="border"
              text="Court"
              capacity="0"
              function={() =>
                alert(
                  schedule.map((scd, s) =>
                    scd.Room === "Court"
                      ? scd.Course === null
                        ? scd.CRS_Code
                        : scd.Course
                      : null
                  )
                )
              }
            />
          </div>
          <div className="col-3 p-0 m-0">
            <div className="h-100 row p-0 m-0">
              <div className="col-3 p-0 m-0">
                <div className="h-75 p-0 m-0"></div>
                <div className="h-25 p-0 m-0">
                  <div className="h-50 p-0 m-0"></div>
                  <div className="h-50 p-0 m-0"></div>
                </div>
              </div>
              <div className="col-9 p-0 m-0">
                <div className="h-75 p-0 m-0">
                  <div className="h-50 p-0 m-0 pb-1">
                    <div className="h-100 border rounded p-1">
                      <PlotButton
                        class="border"
                        text="104b"
                        capacity="0"
                        function={() =>
                          alert(
                            schedule.map((scd, s) =>
                              scd.Room === "104b"
                                ? scd.Course === null
                                  ? scd.CRS_Code
                                  : scd.Course
                                : null
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="h-50 p-0 m-0 pb-1">
                    <div className="h-100 border rounded p-1">
                      <PlotButton
                        class="border"
                        text="103b"
                        capacity="0"
                        function={() =>
                          alert(
                            schedule.map((scd, s) =>
                              scd.Room === "103b"
                                ? scd.Course === null
                                  ? scd.CRS_Code
                                  : scd.Course
                                : null
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="h-25 p-0 m-0 ">
                  <div className="h-75 p-0 m-0">
                    <div className="h-100 row m-0 p-0">
                      <div className="col-5 p-0 m-0"></div>
                      <div className="col-7 p-0 m-0 border rounded p-1"></div>
                    </div>
                  </div>
                  <div className="h-25 p-0 m-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-25 p-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-2 m-0 p-0"></div>
          <div className="col-10 p-0 m-0">
            <div className="h-25 row m-0 p-0"></div>
            <div className="h-75 row m-0 p-0">
              <div className="col-2 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1"></div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="102b"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "102b"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="101b"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "101b"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="DrawLab"
                    capacity="0"
                    function={() =>
                      alert(
                        schedule.map((scd, s) =>
                          scd.Room === "DrawLab"
                            ? scd.Course === null
                              ? scd.CRS_Code
                              : scd.Course
                            : null
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-1 border rounded p-1 m-0 p-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
