import React from "react";
import { PlotButton } from "../../../../component/button/PlotButton";

export function B1() {
  return (
    <div className="h-100 row m-0 p-0 border rounded rounded">
      <div className="h-25 px-2 pt-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-3 m-0 p-0"></div>
          <div className="col-9 p-0 m-0">
            <div className="h-75 row m-0 p-0">
              <div className="col-3 m-0 p-0">
                <div className="h-100 row m-0 p-0">
                  <div className="col-8 p-0 pe-1 pb-1 m-0">
                    <div className="h-100 border rounded">
                      <PlotButton
                        class=""
                        text="Clinic"
                        function={() => alert("Room")}
                      />
                    </div>
                  </div>
                  <div className="col-4 p-0 pe-1 pb-1 m-0">
                    <div className="h-100 border rounded"></div>
                  </div>
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="107b"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="106b"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pb-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="105b"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
            </div>
            <div className="h-25 row m-0 p-0">
              <div className="col-10 p-0 m-0"></div>
              <div className="col-2 p-0 m-0 pb-1">
                <div className="h-100 border rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-50 px-2 m-0">
        <div className="h-100 row p-0 m-0">
          <div className="col-9 p-0 m-0 border rounded">
            <PlotButton class="" text="Court" function={() => alert("Room")} />
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
                    <div className="h-100 border rounded">
                      <PlotButton
                        class=""
                        text="104b"
                        function={() => alert("Room")}
                      />
                    </div>
                  </div>
                  <div className="h-50 p-0 m-0 pb-1">
                    <div className="h-100 border rounded">
                      <PlotButton
                        class=""
                        text="103b"
                        function={() => alert("Room")}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-25 p-0 m-0 ">
                  <div className="h-75 p-0 m-0">
                    <div className="h-100 row m-0 p-0">
                      <div className="col-5 p-0 m-0"></div>
                      <div className="col-7 p-0 m-0 border rounded"></div>
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
                <div className="h-100 border rounded"></div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="102b"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="101b"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded">
                  <PlotButton
                    class=""
                    text="DrawLab"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-1 border rounded m-0 p-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
