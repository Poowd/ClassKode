import React from "react";
import { DefaultDropdown } from "../../component/dropdown/default/DefaultDropdown";
import { NoDisplay } from "../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../component/button/DefaultButton";
import { DefaultInput } from "../../component/input/DefaultInput";

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
            <section className="col-lg-9 p-2 h-100">
              <main className="h-100 position-relative overflow-y-auto">
                <section className="sticky-top w-100 bg-white shadow-sm p-2 mb-2">
                  <div className="d-flex justify-content-end gap-2">
                    {this.props.control}
                  </div>
                </section>
                <section className="px-1">{this.props.list}</section>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
