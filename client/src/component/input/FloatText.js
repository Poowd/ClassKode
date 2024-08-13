import React from "react";

export class FloatText extends React.Component {
  render() {
    return (
      <div class="form-floating mb-3 text-black p-0 m-1">
        <input
          type="email"
          class="form-control form-sm-control bg-transparent"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput" className="bg-transparent pb-3">
          Email address
        </label>
      </div>
    );
  }
}
