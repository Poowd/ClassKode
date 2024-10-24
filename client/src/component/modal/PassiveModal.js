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
              <div className="d-flex justify-content-between align-items-center m-0 ">
                <span className="m-0 mt-2 p-0">{this.props.title}</span>
                <button
                  type="button"
                  className="btn p-0 me-2 d-flex border-0"
                  data-bs-dismiss="modal"
                >
                  <IoCloseOutline />
                </button>
              </div>
              <hr />
              <div>
                <small>
                  <p className="m-0 p-0 text-secondary">{this.props.content}</p>
                </small>
              </div>
              <div className="w-100 d-flex justify-content-end">
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
      </div>
    );
  }
}
