import React from "react";
import { PlotButton } from "../../../../component/button/PlotButton";

export function B1() {
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
                        function={() => alert("Room")}
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
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1 pb-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="106b"
                    capacity="0"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pb-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="105b"
                    capacity="0"
                    function={() => alert("Room")}
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
              function={() => alert("Room")}
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
                        function={() => alert("Room")}
                      />
                    </div>
                  </div>
                  <div className="h-50 p-0 m-0 pb-1">
                    <div className="h-100 border rounded p-1">
                      <PlotButton
                        class="border"
                        text="103b"
                        capacity="0"
                        function={() => alert("Room")}
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
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="101b"
                    capacity="0"
                    function={() => alert("Room")}
                  />
                </div>
              </div>
              <div className="col-3 m-0 p-0 pe-1">
                <div className="h-100 border rounded p-1">
                  <PlotButton
                    class="border"
                    text="DrawLab"
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
