import React from "react";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../button/DefaultButton";
import { Link } from "react-router-dom";

export class ListCard extends React.Component {
  render() {
    return (
      <main className="w-100 bg-white rounded shadow-sm p-3 mb-2 row m-0">
        <section className="col-2 p-0 m-0">
          <h6 className="p-0 m-0">{this.props.slot1}</h6>
        </section>
        <section className="col-5 p-0 m-0">
          <h6 className="p-0 m-0 custom-text-gradient">{this.props.slot2}</h6>
          <small>
            <p className="p-0 m-0 text-secondary fst-italic">
              <span>{this.props.slot3}</span>
            </p>
          </small>
        </section>
        <section className="col-4 p-0 m-0">
          <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end border-end px-3">
            <p className="p-0 m-0">{this.props.slot4}</p>
            <small>
              <p className="p-0 m-0 text-secondary fst-italic">
                <span>{this.props.slot5}</span>
              </p>
            </small>
          </div>
        </section>
        <section className="col-1 p-0 m-0">
          <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
            {this.props.link !== null ? (
              <Link to={this.props.link} state={this.props.state}>
                <DefaultButton
                  class="custom-bg-primary-light"
                  icon={<GrView />}
                />
              </Link>
            ) : null}
            <div className="d-flex gap-2">
              {this.props.custom !== null ? this.props.custom : null}
            </div>
          </div>
        </section>
      </main>
    );
  }
}
