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
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function CreateProjection() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

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
      setTimeout(() => {
        recordLog(
          "Added an Projection Entry",
          "Projection Module",
          `A user added an entry with an Section ${data.Section}`
        );
        showModal(
          "StatusModal",
          "",
          <main className="d-flex flex-column">
            <section className="text-center">
              <h1 className="text-success">{info.icons.status.success}</h1>
              <h3 className="text-success fw-bold">Success</h3>
              <button
                type="button"
                class="btn safe-color mt-3"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </section>
          </main>
        );
        navigate(-1);
      }, 1000); // 2 second delay
    }
  };

  return (
    <>
      <DataControllerTemplate
        title={info.text.moduleText.projection.create}
        description={info.text.moduleText.projection.createDescrition}
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
              class="safe-color px-2"
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
                      <>
                        {option.Section === data.Section ? option.Section : ""}
                      </>
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
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main>{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
    </>
  );
}
