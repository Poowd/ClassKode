import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export class ViewModal extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body p-3">
              <div className="d-flex justify-content-between align-items-center m-0 my-2 ">
                <h5 className="m-0 mt-2 p-0">{this.props.title}</h5>
              </div>
              <div>{this.props.content}</div>
              <div className="w-100 mt-3">
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
