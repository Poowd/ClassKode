import React from "react";

export class DataViewerTemplate extends React.Component {
  render() {
    return (
      <main className="row h-100 m-0 p-0">
        <section className="col-lg-3 h-100 p-2 m-0 height-auto">
          <main className="h-100 bg-white rounded shadow-sm p-3">
            {this.props.extradata}
          </main>
        </section>
        <section className="col-lg-9 p-2 h-100 height-auto">
          <main className="h-100 position-relative overflow-y-auto">
            <main className="h-100 p-2">
              <main className="">
                <div className="d-flex gap-2 my-2">{this.props.control}</div>
                <section className="">
                  <main className="row m-0">
                    <section className="col-lg-7 p-0">
                      <main>{this.props.content}</main>
                    </section>

                    <section className="col-lg-5 p-0">
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
