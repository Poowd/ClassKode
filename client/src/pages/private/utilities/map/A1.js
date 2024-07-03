import React from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PlotButton } from "../../../../component/button/PlotButton";

export function A1() {
  return (
    <div className="h-100 row m-0 p-0 border rounded p-1">
      <div className="col-2 m-0 p-0"></div>
      <div className="col-8 m-0 p-0">
        <div className="h-100 row m-0 p-2">
          <div className="col-6 m-0 p-0">
            <div className="h-100 row m-0 p-0">
              <div className="col-5 m-0 p-0">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="Demo"
                    capacity="0"
                    function={() => alert("Room")}
                  />
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
                        <PlotButton
                          class="border"
                          text="Conference"
                          capacity="0"
                          function={() => alert("Room")}
                        />
                      </div>
                    </div>
                    <div className="h-25 p-0 m-0 pb-1">
                      <div className="h-100 border rounded p-1">
                        <PlotButton
                          class="border"
                          text="Couch"
                          capacity="0"
                          function={() => alert("Room")}
                        />
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
                    <PlotButton
                      class="border"
                      text="EngLab"
                      capacity="0"
                      function={() => alert("Room")}
                    />
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
    </div>
  );
}
