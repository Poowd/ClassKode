import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useDatabase from "../../../../hook/useDatabase";

export function EditCourse() {
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

  const [course, setCourse] = useState([]);
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    CRSID: state.data[0].CRSID,
    CRS_Code: state.data[0].CRS_Code,
    Course: state.data[0].Course,
    PRG_Code: state.data[0].PRG_Code,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-crs", course, setCourse);
    post("sel-acyl", academiclevel, setAcademicLevel);
    post("sel-prg", program, setProgram);
  }, [course]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("upd-crs", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Edit A Course"}
        description={"This module creates a course"}
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
              id="CRS_Code"
              trigger={dataChange}
              value={data.CRS_Code}
              required={true}
            />
            <FormInput
              label="Course"
              id="Course"
              trigger={dataChange}
              value={data.Course}
              required={false}
            />
            <SelectButton
              label="Program"
              id="PRG_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) => (
                      <>
                        {option.PRG_Code === data.PRG_Code
                          ? option.Program
                          : ""}
                      </>
                    ))}
                  />
                  {program.map((option, i) => (
                    <>
                      {data.PRG_Code !== option.PRG_Code ? (
                        <SelectButtonItem
                          value={option.PRG_Code}
                          content={option.Program}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.CRS_Code.length > 0 ? data.CRS_Code : "Code"}</h6>
              <h3>{data.Course.length > 0 ? data.Course : "Course"}</h3>
              <hr />
              <p className="fst-italic text-secondary m-0 p-0">
                {program.map((prog, i) =>
                  data.PRG_Code === prog.PRG_Code ? prog.Program : null
                )}
              </p>
            </section>
          </main>
        }
      />
    </form>
  );
}
