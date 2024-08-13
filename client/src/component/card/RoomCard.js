import React from "react";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../button/DefaultButton";
import { Link } from "react-router-dom";

export class RoomCard extends React.Component {
  render() {
    return (
      <main className="p-3 shadow-sm rounded mb-2">
        <main className="row m-0 p-0">
          <section className="col-3 p-0 m-0">
            <section>
              <h6 className="p-0 m-0">{this.props.section}</h6>
            </section>
          </section>
          <section className="col-9 p-0 m-0">
            <section>
              <h6 className="p-0 m-0">{this.props.course}</h6>
            </section>
            <section>
              <small>
                <p className="p-0 m-0 text-secondary fst-italic">
                  <span>{this.props.time}</span>
                </p>
              </small>
            </section>
          </section>
        </main>
      </main>
    );
  }
}
