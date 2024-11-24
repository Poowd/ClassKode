import React, { useEffect, useState } from "react";
import useSheetImport from "../../../../hook/useSheetImport";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../hook/useConfiguration";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import sheetTemplate from "../../../../assets/template/CURRICULUMbatchupload.xlsx";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogs } from "../../../../hook/useLogs";
import useModal from "../../../../hook/useModal";
import { StatusModal } from "../../../../component/modal/StatusModal";

export function GenerateSetup() {
  const { state } = useLocation();
  //const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [file, sheets, FileUpload, setSheets, setFile] = useSheetImport();
  const [data, setData] = useState([]);
  const [dataentry, setDataEntry] = useState([]);
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [info] = useConfiguration();
  const [recordLog] = useLogs();

  const [toasty, showToast] = useToasty();
  const [course, setCourse] = useState([]);

  function removeSelectedFile() {
    setData([]);
    setSheets([]);
    document.getElementById("formFile").value = "";
    document
      .getElementById("formFile")
      .dispatchEvent(new Event("change", { bubbles: true }));
  }
  useEffect(() => {
    data_get("course-list", setCourse);
  }, []);

  useEffect(() => {
    sheets &&
      showToast(
        info.icons.others.info,
        "Sheet Upload",
        `${file} is successfully uploaded!`
      );
    recordLog(
      "Uploaded a Set of Curriculum",
      "Curriculum Module",
      "A user uploaded a set of Curriculum"
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
          if (checkDuplicate(forCourseModule[i].Course_ID)) {
            const setCourse = await fetch(`${info.conn.server}course-insert`, {
              method: "POST",
              body: JSON.stringify(forCourseModule[i]),
            });
            const courseResponse = await setCourse.json();
            data_get("course-list", setCourse);
          }
        }
        setTimeout(() => {
          recordLog(
            "Saved an Uploaded Curriculum",
            "Curriculum Module",
            "A user saved a set of Curriculum"
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
      } catch (err) {
        showToast(info.icons.others.info, "Curriculum", err);
      }
    }
  };

  const checkDuplicate = (target_id) => {
    course.forEach((item) => {
      if (item.CourseID === target_id) {
        return false;
      }
    });
    return true;
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
                function={saveUserData}
                disabled={file !== null ? false : true}
              />

              {/* <button
                className="btn primary-gradient ms-2"
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
                <h5 className="p-0 m-0">
                  {info.text.moduleText.curriculum.upload}
                </h5>
                <p className="m-0 text-secondary">
                  {info.text.moduleText.curriculum.uploadDescrition}
                </p>
                <hr />
              </header>
              <main>
                <ul className="m-0 p-0">
                  <li className="bg-white rounded shadow-sm p-3 mb-2">
                    <h6 className="m-0">Program</h6>
                    <p className="m-0">{state.program}</p>
                  </li>
                  <li className="bg-white rounded shadow-sm p-3 mb-2">
                    <h6 className="m-0">Department</h6>
                    <p className="m-0">{state.department}</p>
                  </li>
                  <li className="bg-white rounded shadow-sm p-3 mb-2">
                    <h6 className="m-0">Curriculum</h6>
                    <p className="m-0">{state.curriculum}</p>
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
