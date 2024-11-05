import React, { useEffect, useState } from "react";
import useSheetImport from "../../../../hook/useSheetImport";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import { useClipboard } from "../../../../hook/useClipboard";
import useConfiguration from "../../../../hook/useConfiguration";
import { ViewCard } from "../../../../component/card/ViewCard";
import { ListCard } from "../../../../component/card/ListCard";
import useItemCounter from "../../../../hook/useItemCounter";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import sheetTemplate from "../../../../assets/template/BatchUploadTemplate.xlsx";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";

export function GenerateSetup() {
  const { state } = useLocation();
  //const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [file, sheets, FileUpload] = useSheetImport();
  const [data, setData] = useState([]);
  const [dataentry, setDataEntry] = useState([]);
  const [info] = useConfiguration();

  const [toasty, showToast] = useToasty();
  const [details, setDetails] = useState({});
  // const [CopyClipboard] = useClipboard();
  const [itemCounter] = useItemCounter();
  const [savestatus, setSaveStatus] = useState(null);

  useEffect(() => {
    sheets &&
      showToast(
        info.icons.others.info,
        "Sheet Upload",
        `${file} is successfully uploaded!`
      );
    setData(sheets);
    setDataEntry(sheets);
  }, [sheets]);

  const removeDuplicates = (data) => {
    const uniqueEntries = new Map();
    data.forEach((entry) => {
      const key = `${entry.Course_ID}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  //SaVE
  const saveUserData = async (e) => {
    e.preventDefault();

    var forCourseModule = removeDuplicates(dataentry);
    if (sheets === null) {
      showToast(
        info.icons.others.info,
        "Users",
        "No Data Found. Try uploading a sheet file!"
      );
    }
    if (sheets !== null) {
      try {
        for (var i in data) {
          const response = await fetch(
            `${info.conn.server}curriculum-setup-insert`,
            {
              method: "POST",
              body: JSON.stringify({
                data: data[i],
                Curriculum: state.curriculum,
                Program: state.program,
              }),
            }
          );
          const entry = await response.json();
        }

        for (var i in forCourseModule) {
          const setCourse = await fetch(`${info.conn.server}course-insert`, {
            method: "POST",
            body: JSON.stringify(forCourseModule[i]),
          });
          const courseResponse = await setCourse.json();
        }

        showToast(info.icons.others.info, "Users", "User Data are saved!");
        setTimeout(() => {
          navigate(-1);
        }, 2500); // 2 second delay
      } catch (err) {
        showToast(info.icons.others.info, "Users", err);
      }
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
                icon={info.icons.forms.add}
                text="Save"
                function={saveUserData}
                disabled={file !== null ? false : true}
              />

              {/* <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  CopyClipboard(text);
                  showToast(info.icons.others.info, "Clipboard", "Copied!");
                }}
              >
                Copy
              </button> */}
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
                        <th className="p-3">Course ID</th>
                        <th className="text-start p-3">Course</th>
                        <th className="p-3">Subject Area</th>
                        <th className="p-3">Catalog No</th>
                        <th className="p-3">Component</th>
                        <th className="p-3">Units</th>
                        <th className="p-3">Year Level</th>
                        <th className="p-3">Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sheets.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3">{item.Course_ID}</td>
                          <td className="py-3 text-start">{item.Course}</td>
                          <td className="py-3">{`${item.Subject_Area}`}</td>
                          <td className="py-3">{`${item.Catalog_No}`}</td>
                          <td className="py-3">{`${item.Component}`}</td>
                          <td className="py-3">{`${item.Units}`}</td>
                          <td className="py-3">{`${item.Year_Level}`}</td>
                          <td className="py-3">{`${item.Semester}`}</td>
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
