import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export class DefaultToast extends React.Component {
  render() {
    return (
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <strong class="me-auto d-flex gap-2 align-items-center">
              <span>{this.props.icon}</span>
              <span className="mt-1">{this.props.title}</span>
            </strong>
            <button type="button" class="btn btn-sm" data-bs-dismiss="toast">
              <IoCloseOutline />
            </button>
          </div>
          <div class="toast-body">{this.props.content}</div>
        </div>
      </div>
    );
  }
}
