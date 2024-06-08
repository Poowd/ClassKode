import React from "react";
import { DefaultCard } from "../../component/card/DefaultCard";
import { NoDisplay } from "../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../component/button/DefaultButton";
import { FaFilter } from "react-icons/fa";

export class UtilitiesTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-y-auto">
        <main className="h-100">
          <main className="row h-100 m-0">
            <section className="col-lg-3 h-100 p-2">
              <main className="h-100 bg-white rounded shadow-sm p-2">
                <NoDisplay />
              </main>
            </section>
            <section className="col-lg-9 p-2">
              <main className="h-100 d-flex flex-column gap-2">
                <section className="row h-75 m-0">
                  <section className="col-lg-6 ps-0 pe-2">
                    <section className="h-100 bg-white shadow-sm rounded p-2">
                      <NoDisplay />
                    </section>
                  </section>
                  <section className="col-lg-6 pe-0 ps-2">
                    <section className="h-100 bg-white shadow-sm rounded p-2">
                      <NoDisplay />
                    </section>
                  </section>
                </section>
                <section className="h-25">
                  <div className="h-100 d-flex align-items-start justify-content-end bg-white shadow-sm p-2">
                    <NoDisplay />
                  </div>
                </section>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
