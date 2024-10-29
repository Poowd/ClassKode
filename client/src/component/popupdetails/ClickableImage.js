import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { Link } from "react-router-dom";

export class ClickableImage extends React.Component {
  render() {
    return (
      <>
        <button
          type="button"
          class="btn border-0"
          data-bs-toggle="modal"
          data-bs-target={`#${this.props.image}`}
        >
          <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
            <img
              className="w-50 ratio ratio-1x1"
              src={this.props.image}
              alt="..."
            />
          </figure>
        </button>

        <div
          class="modal fade"
          id={this.props.image}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content position-relative overflow-hidden bg-transparent">
              <section className="position-absolute top-0 end-0 p-3">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </section>
              <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
                <img
                  className="w-50 ratio ratio-1x1"
                  src={this.props.image}
                  alt="..."
                />
              </figure>
            </div>
          </div>
        </div>
      </>
    );
  }
}
