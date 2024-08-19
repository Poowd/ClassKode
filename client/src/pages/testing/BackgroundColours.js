import React from "react";
import { DefaultCard } from "../../component/card/DefaultCard";

export class BackgroundColours extends React.Component {
  render() {
    return (
      <main className="row h-100 m-0">
        <section className="col-lg-3 col-md-4 h-25 p-2">
          <DefaultCard
            content={
              <main className="p-3">
                <h3>Gradient 1</h3>
              </main>
            }
            class="gradient-bg-blue"
          />
        </section>

        <section className="col-lg-3 col-md-4 h-25 p-2">
          <DefaultCard
            content={
              <main className="p-3">
                <h3>Gradient 1</h3>
              </main>
            }
            class="gradient-bg-yellow"
          />
        </section>

        <section className="col-lg-3 col-md-4 h-25 p-2">
          <DefaultCard
            content={
              <main className="p-3">
                <h3>Text 1</h3>
              </main>
            }
            class="bg-dark custom-text-yellow"
          />
        </section>

        <section className="col-lg-3 col-md-4 h-25 p-2">
          <DefaultCard
            content={
              <main className="p-3">
                <h3>Text 1</h3>
              </main>
            }
            class="custom-text-blue"
          />
        </section>
      </main>
    );
  }
}
