import React from "react";

export class Error404 extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex align-items-center justify-content-center border rounded">
        <div className="text-center">
          <h5 className="text-dark p-0 display-1 fw-semibold">Error 404</h5>
          <p className="text-secondary p-0">
            The page you are trying to access is not existing.
          </p>
        </div>
      </main>
    );
  }
}
