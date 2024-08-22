import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function CreateDepartment() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [department, setDepartment] = useState([]);
  const [data, setData] = useState({
    DPT_Code: "",
    Department: "",
    DPT_Abbreviation: "",
    DPT_Description: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-dept", department, setDepartment);
  }, [department]);

  const validation = {
    code: function () {
      if (data.DPT_Code.includes(1)) {
        return false;
      }
      return true;
    },
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-dpt", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Department"}
        description={"This module creates a department"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <FormInput
              label="Code"
              id="DPT_Code"
              placeholder="Code"
              trigger={dataChange}
              value={data.DPT_Code}
              required={true}
            />
            <MultipleFormInput
              label="Department Details"
              item={
                <>
                  <MultipleFormInputItem
                    id="Department"
                    placeholder="Department"
                    trigger={dataChange}
                    value={data.Department}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="DPT_Abbreviation"
                    placeholder="Abbreviation"
                    trigger={dataChange}
                    value={data.DPT_Abbreviation}
                    required={true}
                  />
                </>
              }
            />
            <FormInput
              label="Description"
              labelextension="( Optional )"
              placeholder="Description"
              id="DPT_Description"
              trigger={dataChange}
              value={data.DPT_Description}
              required={false}
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.DPT_Code.length > 0 ? data.DPT_Code : "Code"}</h6>
              <h3>
                {data.Department.length > 0 ? data.Department : "Department"}
                <span>
                  {data.DPT_Abbreviation.length > 0
                    ? ` (${data.DPT_Abbreviation})`
                    : " Abbrev"}
                </span>
              </h3>
              <hr />
              <p className="fst-italic text-secondary m-0 p-0">
                {data.DPT_Description.length > 0
                  ? data.DPT_Description
                  : "Description"}
              </p>
            </section>
          </main>
        }
      />
    </form>
  );
}
