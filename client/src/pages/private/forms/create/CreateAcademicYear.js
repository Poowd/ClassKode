import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function CreateAcademicYear() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    ACY_Code: "",
    AcademicYear: "",
    CRR_Code: "",
    StartDate: "",
    EndDate: "",
  });
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-curr", curriculum, setCurriculum);
  }, [curriculum]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-ay", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={handleSubmit}>
      <DataControllerTemplate
        title={"Create A Academic Year"}
        description={"This module creates a academic year"}
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
              label="Academic Year Code"
              id="ACY_Code"
              trigger={dataChange}
              value={data.ACY_Code}
              required={true}
            />

            <FormInput
              label="Academic Year"
              id="AcademicYear"
              trigger={dataChange}
              value={data.AcademicYear}
              required={true}
            />

            <SelectButton
              label="Curriculum"
              id="CRR_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={curriculum.map((option, i) => (
                      <>
                        {option.CRR_Code === data.CRR_Code
                          ? option.Curriculum
                          : ""}
                      </>
                    ))}
                  />
                  {curriculum.map((option, i) => (
                    <>
                      {data.CRR_Code !== option.CRR_Code ? (
                        <SelectButtonItem
                          value={option.CRR_Code}
                          content={option.Curriculum}
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
              label="Start Date"
              id="StartDate"
              trigger={dataChange}
              value={data.StartDate}
              required={true}
            />

            <FormInput
              label="End Date"
              id="EndDate"
              trigger={dataChange}
              value={data.EndDate}
              required={true}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
