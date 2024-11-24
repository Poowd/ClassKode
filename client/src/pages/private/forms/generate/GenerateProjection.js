import React, { useEffect, useState } from "react";
import useSheetImport from "../../../../hook/useSheetImport";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../hook/useConfiguration";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import sheetTemplate from "../../../../assets/template/PROJECTIONbatchupload.xlsx";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogs } from "../../../../hook/useLogs";
import useModal from "../../../../hook/useModal";
import { StatusModal } from "../../../../component/modal/StatusModal";

export function GenerateProjection() {
  const { state } = useLocation();
  //const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [get, post, data_get, data_post] = useDatabase();
  const [file, sheets, FileUpload, setSheets, setFile] = useSheetImport();
  const [data, setData] = useState([]);
  const [info] = useConfiguration();
  const [recordLog] = useLogs();

  const [toasty, showToast] = useToasty();

  const [academicyear, setCurrentAcademicYear] = useState(null);

  useEffect(() => {
    data_post(
      "academic-year-target",
      { data: state.academicyear },
      setCurrentAcademicYear
    );
  }, []);

  useEffect(() => {
    sheets &&
      showToast(
        info.icons.others.info,
        "Sheet Upload",
        `${file} is successfully uploaded!`
      );
    recordLog(
      "Uploaded a file for Projection",
      "Projection Module",
      "A user uploaded a file for Projections of Section"
    );
    setData(sheets);
  }, [sheets]);

  function removeSelectedFile() {
    setData(null);
    setSheets(null);
    setFile(null);
    document.getElementById("formFile").value = "";
    document
      .getElementById("formFile")
      .dispatchEvent(new Event("change", { bubbles: true }));
  }

  //SaVE
  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in data) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}projection-generate`,
              {
                method: "POST",
                body: JSON.stringify(data[i]),
              }
            );
            const entry = await response.json();
            console.log(entry);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      setTimeout(() => {
        recordLog(
          "Saved a Uploaded Projection",
          "Projection Module",
          "A user saved Projections of Section"
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
      <main className="h-100 row m-0 p-0">
        <section className="col-lg-9 h-100 p-1 m-0 overflow-y-auto">
          <main className="p-2 bg-white rounded shadow-sm">
            <section className="d-flex gap-2">
              <DefaultButton
                class="px-2"
                icon={info.icons.navigation.back}
                text="Back"
                function={() => {
                  navigate(-1);
                }}
              />
              <label for="formFile" class="form-label">
                {sheets && FileUpload}
              </label>
              <input
                class="form-control shadow-none form-control-sm"
                type="file"
                id="formFile"
                accept=".xlsx"
                onChange={FileUpload}
              />
              <a
                className="p-0"
                href={sheetTemplate}
                download={`UPLOAD SHEET TEMPLATE ( DO NOT RE-ARRANGE)`}
                style={{ textDecoration: "none" }}
              >
                <DefaultButton
                  class="primary-gradient text-white px-2 h-100"
                  icon={info.icons.others.package}
                  text="Template"
                  function={() => {
                    showToast(
                      info.icons.others.info,
                      "Upload Sheet Template",
                      "Upload Sheet Template has been downloaded!"
                    );
                  }}
                />
              </a>
              <DefaultButton
                class="primary-gradient text-white px-2"
                icon={info.icons.forms.reset}
                type="button"
                text="Reset"
                function={removeSelectedFile}
              />
              <DefaultButton
                class="primary-gradient text-white px-2"
                icon={info.icons.forms.add}
                text="Save"
                function={submitForm}
                disabled={file !== null ? false : true}
              />
            </section>
            <DefaultToast
              icon={toasty.icon}
              title={toasty.title}
              content={toasty.content}
            />
          </main>
          {sheets && (
            <div className="mt-2">
              {/* <pre>{JSON.stringify(sheets, null, 2)}</pre> */}
              <main className="">
                <section className="table-responsive">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th className="p-3">Academic_Year</th>
                        <th className="text-start p-3">Section</th>
                        <th className="p-3">Population</th>
                        <th className="p-3">Academic Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sheets.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3">{item.Academic_Year}</td>
                          <td className="py-3 text-start">{item.Section}</td>
                          <td className="py-3">{`${item.Population}`}</td>
                          <td className="py-3">{`${item.Academic_Level}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          )}
        </section>
        <section className="col-lg-3 h-100 p-1 ps-2 m-0">
          <main className="h-100 bg-white rounded shadow-sm p-3">
            <section>
              <header className="">
                <h5 className="p-0 m-0">
                  {info.text.moduleText.projection.upload}
                </h5>
                <p className="m-0 text-secondary">
                  {info.text.moduleText.projection.uploadDescrition}
                </p>
                <hr />
              </header>
              <main>
                <ul className="m-0 p-0">
                  <li className="bg-white rounded shadow-sm p-3">
                    <h6 className="m-0">Academic Year</h6>
                    <p className="m-0">
                      {academicyear && academicyear.AcademicYear}
                    </p>
                  </li>
                </ul>
              </main>
            </section>
          </main>
        </section>
      </main>
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
