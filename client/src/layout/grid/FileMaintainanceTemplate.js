import React from "react";
import { DefaultCard } from "../../component/card/DefaultCard";
import { NoDisplay } from "../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../component/button/DefaultButton";
import { FaFilter } from "react-icons/fa";

export class FileMaintainanceTemplate extends React.Component {
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
              <main className="h-100 position-relative">
                <section className="sticky-top w-100 bg-white shadow-sm p-2 mb-2">
                  <div className="d-flex justify-content-end">
                    <DefaultButton class="" icon={<FaFilter />} />
                  </div>
                </section>
                <section>
                  <NoDisplay />
                </section>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
