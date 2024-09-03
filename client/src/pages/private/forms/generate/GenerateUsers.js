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

export default function GenerateUsers() {
  //const bootstrap = require("bootstrap");
  const [get, post] = useDatabase();
  const [file, sheets, FileUpload] = useSheetImport();
  const [data, setData] = useState([]);
  const text = "sdas";
  const [info] = useConfiguration();

  const [toasty, showToast] = useToasty();
  // const [CopyClipboard] = useClipboard();
  const [itemCounter] = useItemCounter();
  const [savestatus, setSaveStatus] = useState(null);

  useEffect(() => {
    sheets &&
      showToast(
        info.icons.calendar,
        "Sheet Upload",
        `${file} is successfully uploaded!`
      );
    setData(sheets);
  }, [sheets]);
  console.log(data);

  function saveSingleUser(data) {}

  const saveUserData = (e) => {
    e.preventDefault();
    if (sheets === null) {
      showToast(
        info.icons.calendar,
        "Users",
        "No Data Found. Try uploading a sheet file!"
      );
    }
    if (sheets !== null) {
      try {
        for (var i in data) {
          console.log(data[i]);
          post("gen-users", data[i], setSaveStatus);
        }
        switch (savestatus) {
          case true:
            showToast(info.icons.calendar, "Users", "User Data are saved!");
            break;
          case false:
            showToast(
              info.icons.calendar,
              "Users",
              "User Data didn't processed!"
            );
            break;
          case null:
            showToast(info.icons.calendar, "Users", "No User Data detected!");
            break;
        }
      } catch (err) {
        showToast(info.icons.calendar, "Users", "Error Encountered!");
      }
    }
  };

  return (
    <>
      <main className="h-100 row m-0 p-0">
        <section className="col-lg-9 h-100 p-1 m-0 overflow-y-auto">
          <main className="p-2 bg-white rounded shadow-sm">
            <section className="d-flex">
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
                href={sheetTemplate}
                download={`UPLOAD SHEET TEMPLATE ( DO NOT RE-ARRANGE)`}
              >
                <DefaultButton
                  class="ms-2 bg-primary text-white"
                  icon={info.icons.program}
                  function={() => {
                    showToast(
                      info.icons.calendar,
                      "Upload Sheet Template",
                      "Upload Sheet Template has been downloaded!"
                    );
                  }}
                />
              </a>
              <DefaultButton
                class="ms-2 bg-primary text-white"
                icon={info.icons.add}
                function={saveUserData}
              />

              {/* <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => {
                  CopyClipboard(text);
                  showToast(info.icons.calendar, "Clipboard", "Copied!");
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
              <main>
                {sheets.map((item, i) => (
                  <ListCard
                    slot1={item.SchoolID}
                    slot2={`${item.Firstname} ${item.Lastname}`}
                    slot3={item.Email}
                    slot4={item.Type}
                    slot5={null}
                    view={info.icons.view}
                    link={null}
                    state={null}
                  />
                ))}
              </main>
            </div>
          )}
        </section>
        <section className="col-lg-3 h-100 p-1 ps-2 m-0">
          <main className="h-100 bg-white rounded shadow-sm p-3">
            <section>
              <header className="">
                <h5 className="p-0 m-0">{`Sheet Details`}</h5>
                <p>{`Filename: ${
                  file !== null
                    ? file.substring(file.length, file.length - 5) === ".xlsx"
                      ? file
                      : "Invalid file"
                    : "No file selected"
                }`}</p>
              </header>
              <main className="mt-2">
                <small>
                  <p className="fw-semibold p-0 m-0">User Types</p>
                </small>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <main className="d-flex justify-content-between">
                      <section>{info.icons.users} Developer</section>
                      <section>
                        {`${
                          file !== null
                            ? sheets && itemCounter(sheets, "Developer", "Type")
                            : "0"
                        } dev/s`}
                      </section>
                    </main>
                  </li>
                  <li class="list-group-item">
                    <main className="d-flex justify-content-between">
                      <section>{info.icons.users} Manager</section>
                      <section>
                        {`${
                          file !== null
                            ? sheets && itemCounter(sheets, "Manager", "Type")
                            : "0"
                        } mngr/s`}
                      </section>
                    </main>
                  </li>
                  <li class="list-group-item">
                    <main className="d-flex justify-content-between">
                      <section>{info.icons.users} Admin</section>
                      <section>
                        {`${
                          file !== null
                            ? sheets && itemCounter(sheets, "Admin", "Type")
                            : "0"
                        } adm/s`}
                      </section>
                    </main>
                  </li>
                  <li class="list-group-item">
                    <main className="d-flex justify-content-between">
                      <section>{info.icons.users} User</section>
                      <section>
                        {`${
                          file !== null
                            ? sheets && itemCounter(sheets, "User", "Type")
                            : "0"
                        } user/s`}
                      </section>
                    </main>
                  </li>
                  <li class="list-group-item">
                    <main className="d-flex justify-content-between">
                      <section>{info.icons.users} Invalid</section>
                      <section>
                        {`${
                          file !== null
                            ? sheets.length -
                              (itemCounter(sheets, "Developer", "Type") +
                                itemCounter(sheets, "Manager", "Type") +
                                itemCounter(sheets, "Admin", "Type") +
                                itemCounter(sheets, "User", "Type"))
                            : "0"
                        } row/s`}
                      </section>
                    </main>
                  </li>
                </ul>
              </main>
            </section>
          </main>
        </section>
      </main>
    </>
  );
}
