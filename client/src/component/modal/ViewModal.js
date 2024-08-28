import React from "react";import { IoCloseOutline } from "react-icons/io5";

export class ViewModal extends React.Component {
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
              <hr className="p-0 my-2 mx-0 border" />
              <div>{this.props.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
