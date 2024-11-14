import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

export class PassiveModal extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        //data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="py-3 px-5">
              <div className="d-flex justify-content-between align-items-center m-0 my-2 ">
                <h5 className="m-0 mt-2 p-0">{this.props.title}</h5>
              </div>
              <div>
                <small>
                  <p className="m-0 p-0 text-secondary">{this.props.content}</p>
                </small>
              </div>
              <div className="w-100 mt-3">
                <DefaultButton
                  class="primary-gradient p-2 w-100"
                  type="button"
                  text="Submit"
                  dismiss="modal"
                  function={this.props.trigger}
                />
                <button
                  type="button"
                  className="btn border-0 w-100"
                  data-bs-dismiss="modal"
                >
                  <small>
                    <small className="text-secondary">Close Modal</small>
                  </small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
