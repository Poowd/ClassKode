import React from "react";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../button/DefaultButton";
import { Link } from "react-router-dom";
import { LinkButton } from "../button/LinkButton";

export class ScheduleList extends React.Component {
  render() {
    return (
      <>
        <main
          className={
            "w-100 rounded shadow-sm py-3 px-5 mb-2 row m-0 hover-darken " +
            this.props.class
          }
        >
          <section className="col-lg-2 p-0 m-0">
            <h6 className="p-0 m-0">{this.props.slot1}</h6>
            <small>
              <p className="p-0 m-0 text-secondary">
                <span>{this.props.slot4}</span>
              </p>
            </small>
          </section>
          <section className="col-8 col-lg-6 p-0 m-0">
            <h5 className="p-0 m-0 primary-text fw-bold">{this.props.slot2}</h5>
            <small>
              <p className="p-0 m-0 text-secondary">
                <span>{this.props.slot3}</span>
              </p>
            </small>
          </section>
          <section className="col-4 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column align-items-end">
              <p className="p-0 m-0">{this.props.slot5}</p>
              <small>
                <p className="p-0 m-0 text-secondary">
                  <span>{this.props.slot6}</span>
                </p>
              </small>
            </div>
          </section>
          <div className="d-flex justify-content-end gap-2 p-0 mt-1">
            {this.props.custom !== null ? this.props.custom : null}
          </div>
        </main>
      </>
    );
  }
}
