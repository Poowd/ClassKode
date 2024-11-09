import React, { useEffect, useState } from "react";
import useSheetImport from "../../../../hook/useSheetImport";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../hook/useConfiguration";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import sheetTemplate from "../../../../assets/template/BatchUploadTemplate.xlsx";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";

export function GenerateProjection() {
  const { state } = useLocation();
  //const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [file, sheets, FileUpload, setSheets] = useSheetImport();
  const [data, setData] = useState([]);
  const [info] = useConfiguration();

  const [toasty, showToast] = useToasty();

  useEffect(() => {
    sheets &&
      showToast(
        info.icons.others.info,
        "Sheet Upload",
        `${file} is successfully uploaded!`
      );
    setData(sheets);
  }, [sheets]);

  function removeSelectedFile() {
    setData([]);
    setSheets([]);
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
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
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
                  class="bg-primary text-white px-2 h-100"
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
                class="bg-primary text-white px-2"
                icon={info.icons.forms.reset}
                type="button"
                text="Reset"
                function={removeSelectedFile}
              />
              <DefaultButton
                class="bg-primary text-white px-2"
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
                <h5 className="p-0 m-0">{`Sheet Details`}</h5>
                <p>{state.program}</p>
                <p>{state.department}</p>
                <p>{state.curriculum}</p>
              </header>
            </section>
          </main>
        </section>
      </main>
    </>
  );
}
