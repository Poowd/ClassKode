import React from "react";
import { NoDisplay } from "../../component/placeholder/NoDisplay";

export class DataControllerTemplate extends React.Component {
  render() {
    return (
      <main className="row h-100 m-0">
        <section className="col-lg-3 h-100 p-2">
          <main className="h-100 bg-white rounded shadow-sm p-2">
            <NoDisplay />
          </main>
        </section>
        <section className="col-lg-9 p-2 h-100">
          <main className="h-100 position-relative overflow-y-auto">
            <main className="h-100 p-2">
              <main className="pb-1">
                <div className="d-flex gap-2 my-2">{this.props.control}</div>
                <section className="">
                  <main className="row m-0">
                    <section className="col-7 p-0">
                      <header>
                        <h1 className="fw-bold custom-text-gradient pb-2">
                          {this.props.title}
                        </h1>
                        <p className="text-secondary">{this.props.description}</p>
                        <hr />
                      </header>
                      <section>
                        <main>{this.props.entryform}</main>
                      </section>
                      <section>{this.props.entry}</section>
                    </section>

                    <section className="col-5 p-0">
                      <main className="">{this.props.additional}</main>
                    </section>
                  </main>
                </section>
              </main>
            </main>
          </main>
        </section>
      </main>
    );
  }
}
