import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function EditCoach() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [department, setDepartment] = useState([]);
  const [coach, setCoach] = useState();
  const [data, setData] = useState({
    CCHID: state.data[0].CCHID,
    SCHLID: state.data[0].SCHLID,
    FirstName: state.data[0].FirstName,
    MiddleInitial: state.data[0].MiddleInitial,
    LastName: state.data[0].LastName,
    Gender: state.data[0].Gender,
    Department: state.data[0].DPT_Code,
    Email: state.data[0].Email,
    Phone: state.data[0].Phone,
    Facebook: state.data[0].Facebook,
    Photo: state.data[0].Photo,
  });

  useEffect(() => {
    post("sel-dept", department, setDepartment);
    post("sel-coach", coach, setCoach);
  }, [department, coach]);

  const [dataChange] = useHandleChange(setData);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("upd-coach", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Edit A Coach"}
        description={"This module edits a coach"}
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
              label="School ID"
              id="SCHLID"
              trigger={dataChange}
              value={data.SCHLID}
            />
            <MultipleFormInput
              label="First Name, Middle Initial, & Last Name"
              item={
                <>
                  <MultipleFormInputItem
                    id="FirstName"
                    placeholder="First Name"
                    trigger={dataChange}
                    value={data.FirstName}
                  />
                  <MultipleFormInputItem
                    id="MiddleInitial"
                    placeholder="Middle Initial"
                    trigger={dataChange}
                    value={data.MiddleInitial}
                  />
                  <MultipleFormInputItem
                    id="LastName"
                    placeholder="Last Name"
                    trigger={dataChange}
                    value={data.LastName}
                  />
                </>
              }
            />
            <RadioGroup
              label="Gender"
              selection={
                <>
                  <RadioButton
                    id="male"
                    option="Male"
                    group="Gender"
                    label="Male"
                    trigger={dataChange}
                    checked={data.Gender === "Male"}
                  />
                  <RadioButton
                    id="female"
                    option="Female"
                    group="Gender"
                    label="Female"
                    trigger={dataChange}
                    checked={data.Gender === "Female"}
                  />
                </>
              }
            />
            <SelectButton
              id="Department"
              trigger={dataChange}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) =>
                      option.DPT_Code === data.Department
                        ? option.Department
                        : null
                    )}
                  />
                  {department.map((option, i) =>
                    data.Department !== option.DPT_Code ? (
                      <SelectButtonItem
                        value={option.DPT_Code}
                        content={option.Department}
                      />
                    ) : null
                  )}
                </>
              }
            />
            <MultipleFormInput
              label="Email & Phone"
              item={
                <>
                  <MultipleFormInputItem
                    id="Email"
                    placeholder="Email"
                    trigger={dataChange}
                    value={data.Email}
                  />
                  <MultipleFormInputItem
                    id="Phone"
                    placeholder="Phone"
                    trigger={dataChange}
                    value={data.Phone}
                  />
                </>
              }
            />
            <FormInput
              label="Facebook"
              id="Facebook"
              trigger={dataChange}
              value={data.Facebook}
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <header>
                <h6>{data.SCHLID.length > 0 ? data.SCHLID : "Code"}</h6>
                <h3>
                  <span>
                    {data.FirstName.length > 0 ? data.FirstName : "FirstName"}
                  </span>{" "}
                  <span>
                    {data.MiddleInitial.length > 0
                      ? data.MiddleInitial
                      : "MiddleInitial"}
                  </span>{" "}
                  <span>
                    {data.LastName.length > 0 ? data.LastName : "LastName"}
                  </span>
                </h3>
                <hr />
                <ul className="m-0 p-0 d-flex gap-2">
                  <li className="border m-0 p-2 rounded">
                    <p className="m-0 p-0">{data.Gender}</p>
                  </li>
                  <li className="border m-0 p-2 rounded">
                    <p className="m-0 p-0">
                      {department.map((dept, i) =>
                        dept.DPT_Code === data.Department
                          ? dept.Department
                          : null
                      )}
                    </p>
                  </li>
                </ul>
              </header>
              <main className="row m-0 p-0 mt-3 mb-2">
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Phone: {data.Phone.length > 0 ? data.Phone : "Phone"}
                  </p>
                </section>
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Email: {data.Email.length > 0 ? data.Email : "Email"}
                  </p>
                </section>
              </main>
              <main>
                <section>
                  <Link to={data.Facebook} target="_blank">
                    {data.Facebook.length > 0 ? data.Facebook : "Facebook"}
                  </Link>
                </section>
              </main>
            </section>
          </main>
        }
      />
    </form>
  );
}
