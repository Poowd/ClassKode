import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Loader } from "../loader/Loader";

export class LoaderModal extends React.Component {
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
            <div className="modal-body p-5 d-flex justify-content-center align-items-center flex-column">
              <div className="mb-3">
                <Loader />
              </div>
              <div>{this.props.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
