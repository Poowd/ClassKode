import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export class StatusModal extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-body p-5 d-flex justify-content-between text-center align-items-center flex-column">
              <div>{this.props.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
