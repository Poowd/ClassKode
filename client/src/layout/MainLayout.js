import React from "react";
import "./Layout.css";
import { BiGridAlt } from "react-icons/bi";
import { DefaultButton } from "../component/Button/DefaultButton";

export class MainLayout extends React.Component {
  render() {
    return (
      <main className="vh-100 bg-light">
        <header className="main-header">
          <nav className="main-top-bar">
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-primary btn-sm">
                <BiGridAlt />
              </button>
              <h5 className="p-0 m-0 d-flex align-items-center">navigation</h5>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-primary btn-sm">
                =
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                =
              </button>

              <button type="button" className="btn btn-primary btn-sm">
                =
              </button>
            </div>
          </nav>
        </header>
        <main className="main-content">
          <section className="h-100 shadow-sm bg-white rounded p-2">
            <div className="h-100 rounded overflow-y-auto">
              <div className="">
                <DefaultButton class="btn-primary" icon={<BiGridAlt />} />
                <DefaultButton class="btn-primary" text={"Hello World"} />
                <DefaultButton
                  class="btn-primary"
                  icon={<BiGridAlt />}
                  text={"Hello World"}
                />
              </div>
            </div>
          </section>
        </main>
      </main>
    );
  }
}
