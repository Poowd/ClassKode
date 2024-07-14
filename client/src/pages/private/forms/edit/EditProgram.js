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
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

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
  const [validation, setValidation] = useState({
    PRG_Code: Base(data.PRG_Code),
    Program: Base(data.Program),
    PRG_Abbreviation: Base(data.PRG_Abbreviation),
    DPT_Code: Base(data.DPT_Code),
    AcademicLevel: Base(data.AcademicLevel),
    PRG_Description: Base(data.PRG_Description),
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("department", department, setDepartment);
    post("section", section, setSection);
    post("program", program, setProgram);
    post("yearlevel", yearlevel, setYearLevel);
    post("semester", semester, setSemester);
    post("academiclevel", academiclevel, setAcademicLevel);
  }, [department, academiclevel, yearlevel, semester]);

  useEffect(() => {
    ValidateProgram(
      data.PRG_Code,
      data.Program,
      data.PRG_Abbreviation,
      data.PRG_Description,
      prg_dupe(),
      setValidation
    );
  }, [data]);

  function prg_dupe() {
    if (program.length > 0) {
      for (var i = 0; i < program.length; i++) {
        if (
          program[i].PRG_Code === data.PRG_Code &&
          program[i].PRGID !== data.PRGID
        ) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          validation.PRG_Code[0].Result &&
          validation.Program[0].Result &&
          validation.PRG_Abbreviation[0].Result
        ) {
          post("update-existing-program", data, setData);
          navigate("/institution/program");
        }
      }}
    >
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
        content={
          <>
            <FormInput
              label="Program Code"
              id="PRG_Code"
              alert={validation.PRG_Code[0].Message}
              class={validation.PRG_Code[0].State[0]}
              success={validation.PRG_Code[0].State[1]}
              trigger={dataChange}
              value={data.PRG_Code}
              required={true}
            />

            <MultipleFormInput
              label="Program"
              alert={
                <>
                  <span className={"col p-0 " + validation.Program[0].State[1]}>
                    {validation.Program[0].Message}
                  </span>
                  <span
                    className={
                      "col p-0 " + validation.PRG_Abbreviation[0].State[1]
                    }
                  >
                    {validation.PRG_Abbreviation[0].Message}
                  </span>
                </>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="Program"
                    placeholder="Program"
                    class={validation.Program[0].State[0]}
                    success={validation.Program[0].State[1]}
                    trigger={dataChange}
                    value={data.Program}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="PRG_Abbreviation"
                    placeholder="PRG_Abbreviation"
                    class={validation.PRG_Abbreviation[0].State[0]}
                    success={validation.PRG_Abbreviation[0].State[1]}
                    trigger={dataChange}
                    value={data.PRG_Abbreviation}
                    required={true}
                  />
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

            <FormInput
              label={
                <>
                  Description{" "}
                  <span className="text-secondary fw-regular">
                    ( Optional )
                  </span>
                </>
              }
              id="PRG_Description"
              alert={validation.PRG_Description[0].Message}
              class={validation.PRG_Description[0].State[0]}
              success={validation.PRG_Description[0].State[1]}
              trigger={dataChange}
              value={data.PRG_Description}
              required={false}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
