import React from "react";
import { DefaultCard } from "../../component/card/DefaultCard";
import { NoDisplay } from "../../component/placeholder/NoDisplay";

export class DashboardTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-y-auto">
        <header className="dashboard-cards overflow-y-auto">
          <main className="row h-100 m-0">
            <section className="col-lg-4 col-md-4 p-2">
              <DefaultCard content={<NoDisplay />} />
            </section>
            <section className="col-lg-4 col-md-4 p-2">
              <DefaultCard content={<NoDisplay />} />
            </section>
            <section className="col-lg-4 col-md-4 p-2">
              <DefaultCard content={<NoDisplay />} />
            </section>
          </main>
        </header>
        <main className="h-75 overflow-y-auto">
          <main className="row h-100 m-0">
            <section className="col-lg-8 p-2">
              <NoDisplay />
            </section>
            <section className="col-lg-4 p-2">
              <NoDisplay />
            </section>
          </main>
        </main>
      </main>
    );
  }
}
