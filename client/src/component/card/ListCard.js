import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { Link } from "react-router-dom";
import { LinkButton } from "../button/LinkButton";

export class ListCard extends React.Component {
  render() {
    return (
      <main className="w-100 bg-white rounded shadow-sm py-3 px-5 mb-2 row m-0 hover-darken">
        <section className="col-lg-2 p-0 m-0">
          <h6 className="p-0 m-0">{this.props.slot1}</h6>
        </section>
        <section className="col-7 col-lg-6 p-0 m-0">
          <h5 className="p-0 m-0 primary-text fw-bold">{this.props.slot2}</h5>
          <small>
            <p className="p-0 m-0 text-secondary">
              <span>{this.props.slot3}</span>
            </p>
          </small>
        </section>
        <section className="col-4 p-0 m-0">
          <div className="h-100 w-100 d-flex flex-column align-items-end">
            <p className="p-0 m-0 text-end">{this.props.slot4}</p>
            <small>
              <p className="p-0 m-0 text-secondary">
                <span>{this.props.slot5}</span>
              </p>
            </small>
          </div>
        </section>
        <div className="d-flex justify-content-end gap-2 p-0 mt-2">
          {this.props.link !== null ? (
            <LinkButton
              to={this.props.link}
              state={this.props.state}
              class="primary-gradient"
              icon={this.props.view}
            />
          ) : null}
          {this.props.custom !== null ? this.props.custom : null}
        </div>
      </main>
    );
  }
}
