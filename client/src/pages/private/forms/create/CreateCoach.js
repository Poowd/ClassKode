import React, { useEffect } from "react";
import { FormInput } from "../../../../component/input/FormInput";

export function CreateCoach() {
  return (
    <form onSubmit={""}>
      <header>
        <h3 className="m-0 p-0">Create A Coach</h3>
        <p className="m-0 p-0 text-secondary">This module creates a coach</p>
        <hr />
      </header>
      <main>
        <FormInput label="Label" id="ID" placeholder="Input" />
      </main>
    </form>
  );
}
