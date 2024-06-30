import React from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PlotButton } from "../../../../component/button/PlotButton";

export function A1() {
  return (
    <div className="h-100 row m-0 p-0 border rounded rounded">
      <div className="col-2 m-0 p-0"></div>
      <div className="col-8 m-0 p-0">
        <div className="h-100 row m-0 p-2">
          <div className="col-6 m-0 p-0">
            <div className="h-100 row m-0 p-0">
              <div className="col-4 m-0 p-0">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="Demo"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-1 m-0 p-0"></div>
              <div className="col-7 m-0 p-0">
                <div className="h-100 p-0 m-0">
                  <div className="h-25 p-0 m-0 pb-1">
                    <div className="h-100 border rounded"></div>
                  </div>
                  <div className="h-75 p-0 m-0">
                    <div className="h-50 p-0 m-0 pb-1">
                      <div className="h-100 border rounded">
                        <PlotButton
                          class=""
                          text="Conference"
                          function={() => alert("Room")}
                        />
                      </div>
                    </div>
                    <div className="h-25 p-0 m-0 pb-1">
                      <div className="h-100 border rounded">
                        <PlotButton
                          class=""
                          text="Couch"
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
                <div className="h-100 border rounded"></div>
              </div>
              <div className="h-75 p-0 m-0">
                <div className="h-75 p-0 m-0 pb-1">
                  <div className="h-100 border rounded">
                    <PlotButton
                      class=""
                      text="EngLab"
                      function={() => alert("Room")}
                    />
                  </div>
                </div>
                <div className="h-25 p-0 m-0 border rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 m-0 p-0"></div>
    </div>
  );
}
