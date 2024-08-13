import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function EditProgram() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [department, setDepartment] = useState([]);
  const [section, setSection] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    PRGID: state.data[0].PRGID,
    PRG_Code: state.data[0].PRG_Code,
    Program: state.data[0].Program,
    PRG_Abbreviation: state.data[0].PRG_Abbreviation,
    DPT_Code: state.data[0].DPT_Code,
    AcademicLevel: state.data[0].AcademicLevel,
    PRG_Description: state.data[0].PRG_Description,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-dept", department, setDepartment);
    post("section", section, setSection);
    post("sel-prg", program, setProgram);
    post("yearlevel", yearlevel, setYearLevel);
    post("semester", semester, setSemester);
    post("academiclevel", academiclevel, setAcademicLevel);
  }, [department, academiclevel, yearlevel, semester]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("upd-prg", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Program"}
        description={"This module creates a program"}
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
              label="Program Code"
              id="PRG_Code"
              trigger={dataChange}
              value={data.PRG_Code}
              required={true}
            />
            <MultipleFormInput
              label="Program"
              item={
                <>
                  <MultipleFormInputItem
                    id="Program"
                    placeholder="Program"
                    trigger={dataChange}
                    value={data.Program}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="PRG_Abbreviation"
                    placeholder="PRG_Abbreviation"
                    trigger={dataChange}
                    value={data.PRG_Abbreviation}
                    required={true}
                  />
                </>
              }
            />
            <SelectButton
              label="Academic Level"
              id="AcademicLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={academiclevel.map((option, i) => (
                      <>
                        {option.AcademicLevel === data.AcademicLevel
                          ? option.AcademicLevel
                          : ""}
                      </>
                    ))}
                  />
                  {academiclevel.map((option, i) => (
                    <>
                      {data.AcademicLevel !== option.AcademicLevel ? (
                        <SelectButtonItem
                          value={option.AcademicLevel}
                          content={option.AcademicLevel}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <SelectButton
              label="Department"
              id="DPT_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) => (
                      <>
                        {option.DPT_Code === data.DPT_Code
                          ? option.Department
                          : ""}
                      </>
                    ))}
                  />
                  {department.map((option, i) => (
                    <>
                      {data.Department !== option.DPT_Code ? (
                        <SelectButtonItem
                          value={option.DPT_Code}
                          content={option.Department}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <FormInput
              label="Description"
              labelextension="( Optional )"
              id="PRG_Description"
              trigger={dataChange}
              value={data.PRG_Description}
              required={false}
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.PRG_Code.length > 0 ? data.PRG_Code : "Code"}</h6>
              <h3>
                {data.Program.length > 0 ? data.Program : "Department"}
                <span>
                  {data.PRG_Abbreviation.length > 0
                    ? ` (${data.PRG_Abbreviation})`
                    : " Abbrev"}
                </span>
              </h3>
              <hr />
              <ul className="m-0 p-0 d-flex gap-2 mb-3">
                <li className="border m-0 p-2 rounded">
                  <p className="m-0 p-0">{data.AcademicLevel}</p>
                </li>
                <li className="border m-0 p-2 rounded">
                  <p className="m-0 p-0">
                    {department.map((dept, i) =>
                      data.DPT_Code === dept.DPT_Code ? dept.Department : null
                    )}
                  </p>
                </li>
              </ul>
              <p className="fst-italic text-secondary m-0 p-0">
                {data.PRG_Description.length > 0
                  ? data.PRG_Description
                  : "Description"}
              </p>
            </section>
          </main>
        }
      />
    </form>
  );
}
