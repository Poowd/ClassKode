import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { NoDisplay } from "../../../../component/placeholder/NoDisplay";

export function CreateProjection() {
  const navigate = useNavigate();
  const { state } = useLocation();
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

  const [yearlevel, setYearLevel] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [semester, setSemester] = useState([]);
  const [data, setData] = useState({
    ACY_Code: state.academicyear.ACY_Code,
  });
  const [selectedValues, setSelectedValues] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-prg", program, setProgram);
    post("sel-sect", section, setSection);
    post("sel-yrlvl", yearlevel, setYearLevel);
    post("sel-sem", semester, setSemester);
  }, []);

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues, data]);

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.Section !== item;
      })
    );
  };

  const submitForm = () => {
    if (true) {
      selectedValues.map((item, i) => {
        post("ins-proj", item, setSelectedValues);
      });
      navigate(-1);
    }
  };

  return (
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-3 p-0 m-0">
        <NoDisplay />
      </section>
      <section className="col-lg-9 p-3 m-0">
        <header>
          <h3 className="m-0 p-0">Section Projection</h3>
          <p className="m-0 p-0 text-secondary">Setup section projection</p>
          <hr className="p-0 mx-0 my-2" />
        </header>
        <main className="">
          <div className="d-flex gap-2 my-2">
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="button"
              text="Submit"
              function={submitForm}
            />
          </div>
        </main>
        {program.map((prg, i) => (
          <div className="px-3 py-2 my-2 mx-1 rounded shadow-sm">
            <label className="d-flex align-items-center  my-2 mx-0">
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className="">{prg.Program}</span>
                <div className="d-flex align-items-center gap-3">
                  <span className="">{prg.AcademicLevel}</span>
                </div>
              </div>
            </label>
            <hr />
            <main>
              {yearlevel.map((yrl, o) =>
                yrl.AcademicLevel === prg.AcademicLevel ? (
                  <div className="d-block mb-2">
                    <div>
                      <span className="fw-semibold text-secondary">
                        {yrl.YearLevel}
                      </span>
                    </div>
                    <div>
                      {semester.map((sms, k) => (
                        <>
                          <span className="mb-2 fst-italic text-secondary">
                            {sms.Semester}
                          </span>
                          <div className="mb-3">
                            {section.map((sct, j) =>
                              yrl.YearLevel === sct.YearLevel ? (
                                sms.Semester === sct.Semester ? (
                                  sct.PRG_Code === prg.PRG_Code ? (
                                    <label
                                      htmlFor={j}
                                      className="d-flex flex-wrap gap-2 align-items-center justify-content-between py-2 px-5 rounded shadow-sm"
                                    >
                                      <div className="d-flex gap-2">
                                        <span className="fw-semibold">
                                          {sct.Section}
                                        </span>
                                      </div>
                                      <div className="d-flex gap-2 align-items-center">
                                        <form
                                          className="d-flex gap-2 align-items-center"
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            setSelectedValues((prev) => [
                                              ...prev,
                                              {
                                                id: "SCT" + j,
                                                Section: sct.Section,
                                                Population:
                                                  document.getElementById(
                                                    "SCT" + j
                                                  ).value,
                                                ACY_Code: data.ACY_Code,
                                              },
                                            ]);
                                          }}
                                        >
                                          <FormInput
                                            label={null}
                                            id={"SCT" + j}
                                            class={"text-end form-control-sm"}
                                            required={true}
                                          />

                                          <DefaultButton
                                            class="btn-outline-success"
                                            type="submit"
                                            icon={<IoMdArrowRoundBack />}
                                          />
                                        </form>

                                        <DefaultButton
                                          class="btn-outline-danger"
                                          type="button"
                                          icon={<IoMdArrowRoundBack />}
                                          function={() => {
                                            removeItem(sct.Section);
                                            document.getElementById(
                                              `SCT${j}`
                                            ).value = "";
                                          }}
                                        />
                                      </div>
                                    </label>
                                  ) : null
                                ) : null
                              ) : null
                            )}
                          </div>
                        </>
                      ))}
                      <hr />
                    </div>
                  </div>
                ) : null
              )}
            </main>
          </div>
        ))}
      </section>
    </main>
  );
}
