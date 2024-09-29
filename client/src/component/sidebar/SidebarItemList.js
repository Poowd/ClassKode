import React, { useState } from "react";
import owie from "../../assets/imgs/misc/owie.png";

export class SidebarItemList extends React.Component {
  render() {
    return (
      <main className="w-100 h-100 bg-white shadow-lg rounded p-2">
        <main className="h-100 w-100 bg-white shadow-sm rounded">
          <main className="row h-100 m-0 p-0 p-lg-2">
            <section className="col-4 m-0 p-0">
              <ul className="h-100 overflow-y-auto m-0 p-1 d-flex flex-column gap-2">
                {this.props.list}
              </ul>
            </section>
            <section className="col-8 m-0 p-0 overflow-y-auto h-100">
              <main className="d-flex align-content-start flex-wrap gap-2 justify-content-start px-1 h-auto rounded">
                {this.props.items}
                <main className="w-100 bottom-0 end-0 d-flex align-items-center justify-content-end">
                  <p className="p-0 m-0 border rounded-pill p-3">Where do you want to go?</p>
                  <img
                    src={owie}
                    alt="..."
                    className=""
                    style={{ height: "10em" }}
                  />
                </main>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
