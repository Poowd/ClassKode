import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";

export class PassiveModal extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {this.props.title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <hr />
              <div>
                <small>
                  <p className="m-0 p-0 text-secondary">{this.props.content}</p>
                </small>
              </div>
              <DefaultButton
                class="btn-primary p-2"
                type="button"
                icon={<IoMdArrowRoundBack />}
                text="Submit"
                dismiss="modal"
                function={this.props.trigger}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
