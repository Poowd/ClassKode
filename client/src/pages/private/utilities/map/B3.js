import React from "react";
import { PlotButton } from "../../../../component/button/PlotButton";

export function B3() {
  return (
    <div className="h-100 row m-0 p-0 border rounded p-1 rounded p-1">
      <div className="h-25 px-2 pt-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-3 m-0 p-0"></div>
          <div className="col-9 p-0 m-0">
            <div className="h-75 row m-0 p-0">
              <div className="col-3 m-0 p-0">
                <div className="h-100 row m-0 p-0">
                  <div className="col-8 p-0 pe-1 pb-1 m-0">
                    <div className="h-100 "></div>
                  </div>
                  <div className="col-4 p-0 pe-1 pb-1 m-0">
                    <div className="h-100"></div>
                  </div>
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100"></div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100"></div>
              </div>
              <div className="col-3 m-0 p-0 pb-1">
                <div className="h-100"></div>
              </div>
            </div>
            <div className="h-25 row m-0 p-0"></div>
          </div>
        </div>
      </div>
      <div className="h-50 px-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-9 p-0 m-0"></div>
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
                    <div className="h-100 "></div>
                  </div>
                  <div className="h-50 p-0 m-0 pb-1">
                    <div className="h-100 "></div>
                  </div>
                </div>
                <div className="h-25 p-0 m-0 ">
                  <div className="h-50 p-0 m-0"></div>
                  <div className="h-50 p-0 m-0"></div>
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
                    text="avr3"
                    capacity="0"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="avr2"
                    capacity="0"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="avr1"
                    capacity="0"
                    function={() => alert("Room")}
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
