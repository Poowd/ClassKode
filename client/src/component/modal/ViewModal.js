import React from "react";

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
              <hr className="p-0 my-2 mx-0 border" />
              <div>{this.props.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
