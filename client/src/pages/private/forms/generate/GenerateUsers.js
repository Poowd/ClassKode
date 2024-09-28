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
import { useNavigate } from "react-router-dom";

export function GenerateUsers() {
  //const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [file, sheets, FileUpload] = useSheetImport();
  const [data, setData] = useState([]);
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
  }, [sheets]);
  console.log(data);

  const saveUserData = async (e) => {
    e.preventDefault();
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
          console.log(data[i]);
          const response = await fetch(`${info.conn.server}user-generate`, {
            method: "POST",
            body: JSON.stringify(data[i]),
          });
          const entry = await response.json();
          console.log(entry);
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
  const [usertypes, setUserTypes] = useState([
    {
      title: "Developer",
      icon: info.icons.usertypes.developer,
      shortform: "dev/s",
    },
    {
      title: "Manager",
      icon: info.icons.usertypes.manager,
      shortform: "mngr/s",
    },
    {
      title: "Admin",
      icon: info.icons.usertypes.admin,
      shortform: "adm/s",
    },
    {
      title: "User",
      icon: info.icons.usertypes.user,
      shortform: "usr/s",
    },
  ]);

  const temparr = [];

  useEffect(() => {
    usertypes.map((type, i) => {
      temparr.push({
        title: type.title,
        icon: type.icon,
        shortform: type.shortform,
        count:
          file !== null
            ? sheets && itemCounter(sheets, type.title, "Type")
            : "0",
      });
    });
    setDetails(temparr);
  }, [file]);

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
                  icon={info.icons.others.package}
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
                class="ms-2 bg-primary text-white"
                icon={info.icons.forms.add}
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
              <main>
                {sheets.map((item, i) => (
                  <ListCard
                    slot1={item.SchoolID}
                    slot2={`${item.Firstname} ${item.Lastname}`}
                    slot3={item.Email}
                    slot4={item.Type}
                    slot5={item.PermissionLevel}
                    view={info.icons.forms.view}
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
              {file && (
                <main className="mt-2">
                  <small>
                    <p className="fw-semibold p-0 m-0">User Types</p>
                  </small>
                  <ul class="list-group list-group-flush">
                    {details.map((item, i) => (
                      <li class="list-group-item">
                        <main className="d-flex justify-content-between">
                          <section>
                            {item.icon} {item.title}
                          </section>
                          <section>
                            {item.count} {item.shortform}
                          </section>
                        </main>
                      </li>
                    ))}
                    <li class="list-group-item">
                      <main className="d-flex justify-content-between">
                        <section>
                          {info.icons.usertypes.invalid} Invalid
                        </section>
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
              )}
            </section>
          </main>
        </section>
      </main>
    </>
  );
}
