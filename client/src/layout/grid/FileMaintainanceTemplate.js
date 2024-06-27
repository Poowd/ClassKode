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
            <section className="col-lg-3 h-100 p-1">
              <main className="h-100 bg-white rounded shadow-sm p-2">
                {this.props.sidepanel}
              </main>
            </section>
            <section className="col-lg-9 p-1 h-100">
              <main className="h-100 position-relative overflow-y-auto px-1">
                <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
                  <div className="d-flex justify-content-end gap-2">
                    {this.props.control}
                  </div>
                </section>
                <section>{this.props.list}</section>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
