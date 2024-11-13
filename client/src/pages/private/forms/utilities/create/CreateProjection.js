import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import useHandleChange from "../../../../../hook/useHandleChange";
import useValidation from "../../../../../hook/useValidation";
import useDatabase from "../../../../../hook/useDatabase";
import { NoDisplay } from "../../../../../component/placeholder/NoDisplay";
import useConfiguration from "../../../../../hook/useConfiguration";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { MainInput } from "../../../../../component/input/MainInput";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";

export function CreateProjection() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

  const [section, setSection] = useState([]);
  const [data, setData] = useState({
    AcademicYear: "",
    Section: "",
    Population: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [currentacademicyear, setCurrentAcademicYear] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("section-list", setSection);
  }, []);

  useEffect(() => {
    //currentacademicyear.map((ay, i) => setCurrent(ay));
    setData((prev) => ({ ...prev, AcademicYear: params.id }));
  }, [currentacademicyear]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      do {
        try {
          const response = await fetch(`${info.conn.server}projection-insert`, {
            method: "POST",
            body: JSON.stringify(data),
          });
          const entry = await response.json();
        } catch (error) {
          console.log(error);
        }
      } while (data.Status === "Success");
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <DataControllerTemplate
      title={"Coach Assignment"}
      description={
        "Assign a coach to a set of units and target course for this academic year"
      }
      additional={<main className="px-3"></main>}
      control={
        <>
          <DefaultButton
            class="btn-outline-secondary"
            type="button"
            icon={info.icons.navigation.back}
            function={() => navigate(-1)}
          />
          <DefaultButton
            class="btn-success px-2"
            function={submitForm}
            text="Submit"
          />
        </>
      }
      entryform={
        <>
          <MainSelect
            label="Section"
            id="Section"
            trigger={dataChange}
            required={true}
            option={
              <>
                <SelectButtonItemSelected
                  content={section.map((option) => (
                    <>{option.Section === data.Section ? option.Section : ""}</>
                  ))}
                />
                {section.map((option, i) => (
                  <>
                    {data.Section !== option.Section ? (
                      <SelectButtonItem
                        key={i}
                        value={option.Section}
                        content={option.Section}
                      />
                    ) : null}
                  </>
                ))}
              </>
            }
          />
          <MainInput
            label="Population"
            id="Population"
            trigger={dataChange}
            value={data.Population}
            required={true}
          />
        </>
      }
      entry={<main className="p-3"></main>}
    />
  );
}
