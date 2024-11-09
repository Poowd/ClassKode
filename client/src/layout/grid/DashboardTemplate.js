import React from "react";
import { DefaultCard } from "../../component/card/DefaultCard";

export class DashboardTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-y-auto">
        <header className="dashboard-cards overflow-y-auto">
          <main className="row h-100 m-0">
            <section className="col-lg-3 col-md-4 p-2 h-100">
              <DefaultCard
                content={this.props.card1}
                class={this.props.cardcolor}
              />
            </section>
            <section className="col-lg-3 col-md-4 p-2 h-100">
              <DefaultCard
                content={this.props.card2}
                class={this.props.cardcolor}
              />
            </section>
            <section className="col-lg-3 col-md-4 p-2 h-100">
              <DefaultCard
                content={this.props.card3}
                class={this.props.cardcolor}
              />
            </section>
            <section className="col-lg-3 col-md-4 p-2 h-100">
              <DefaultCard
                content={this.props.card4}
                class={this.props.cardcolor}
              />
            </section>
          </main>
        </header>
        <main className="h-75">
          <main className="row h-100 m-0">
            <section className="col-lg-8 p-2">
              <main className="h-100">{this.props.chart1}</main>
            </section>
            <section className="col-lg-4 p-2">
              <main className="h-100">
                <main className="h-100 d-flex flex-column gap-2">
                  <section className="h-50 rounded  bg-white shadow-sm">
                    {this.props.chart2}
                  </section>
                  <section className="h-50 pt-2 rounded bg-white shadow-sm">
                    {this.props.chart3}
                  </section>
                </main>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
