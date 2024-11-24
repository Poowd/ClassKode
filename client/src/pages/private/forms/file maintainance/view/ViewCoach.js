import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { LinkButton } from "../../../../../component/button/LinkButton";
import useModal from "../../../../../hook/useModal";
import { PassiveModal } from "../../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../../hook/useHandleChange";
import useArchiveEntry from "../../../../../hook/useArchiveEntry";
import useDatabase from "../../../../../hook/useDatabase";
import useConfiguration from "../../../../../hook/useConfiguration";
import { DataViewerTemplate } from "../../../../../layout/grid/DataViewerTemplate";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { TextFormat2 } from "../../../../../component/textformat/TextFormat2";
import { ProgressBar } from "../../../../../component/progressbar/ProgressBar";
import { useCoachUnits } from "../../../../../hook/useCoachUnits";

const supabase = createClient(
  "https://pgcztzkowuxixfyiqera.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnY3p0emtvd3V4aXhmeWlxZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODQ0MTUsImV4cCI6MjA0MTA2MDQxNX0.ryLXhP4sBBhO5_JVgQ4YJ9BlpdlD2NQM2mjDRbkc3NY"
);

const CDNURL =
  "https://pgcztzkowuxixfyiqera.supabase.co/storage/v1/object/public/images/";

export function ViewCoach() {
  const navigate = useNavigate();
  const params = useParams();
  const [get, post, data_get, data_post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [getCoachUnits] = useCoachUnits();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [units, setUnits] = useState([]);
  const [assign, setAssign] = useState([]);
  const [department, setDepartment] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [specialization, setSpecializaton] = useState([]);
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_get("department-list", setDepartment);
    data_get("class-schedule-list", setSchedules);
    data_post("assign-list-target", { data: params.id }, setAssign);
    data_post("coach-units", { data: params.id }, setUnits);
    data_post("coach-target", { data: params.id }, setData);
  }, []);

  useEffect(() => {
    try {
      setCurrentImage(data[0].Image);
      data_post(
        "specialization-target",
        { data: data[0].SCHLID },
        setSpecializaton
      );
    } catch (error) {}
  }, [data]);

  const removeDuplicates = (data) => {
    const uniqueEntries = new Map();
    data.forEach((entry) => {
      const key = `${entry.Subject}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      data_post("coach-archive", { data: params.id }, setData);
      showToast(
        info.icons.others.info,
        "Coach",
        `Coach ${data[0].FirstName} ${data[0].LastName} is set to archive!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 1000); // 2 second delay
    } else {
      showModal(
        "Modal",
        "Archive Entry",
        <p>
          <span>Type the code </span>
          <span className="fw-bold text-black">{code}</span>
          <span> to archive </span>
          <span className="fw-bold text-black">
            {data[0].FirstName} {data[0].LastName}
          </span>
        </p>
      );
    }
  };

  return (
    <>
      <DataViewerTemplate
        title={"View A Coach"}
        description={"This module views a coach"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="warning-color px-2"
              icon={info.icons.forms.edit}
              to={`/coach/edit/${params.id}`}
              state={{ data: data }}
              text={"Edit"}
            />
            <DefaultButton
              class="danger-color px-2"
              icon={info.icons.forms.archive}
              function={() =>
                showModal(
                  "Modal",
                  "Archive Entry",
                  <>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].FirstName} {data[0].LastName}
                    </span>
                  </>
                )
              }
              text={"Archive"}
            />
          </>
        }
        extradata={
          <>
            <p>Specialization</p>
            {specialization &&
              removeDuplicates(specialization).map((special, i) => (
                <main className="bg-white rounded shadow-sm p-2 px-3 mb-2">
                  <p className="m-0">{`${special.CourseID} - ${special.Course}`}</p>
                </main>
              ))}
          </>
        }
        content={
          <>
            {data &&
              data.map((item, i) => (
                <main key={i} className="px-0 py-3 m-0">
                  <header>
                    <h1 className="fw-bold primary-text pb-2">
                      {`${item.FirstName} ${
                        item.MiddleInitial !== (null || "")
                          ? " " + item.MiddleInitial + ". "
                          : " "
                      } ${item.LastName}`}
                    </h1>
                    <hr />
                  </header>
                  <main className="p-3">
                    <section>
                      <main>
                        <TextFormat2 header="School ID" data={item.SCHLID} />
                        <TextFormat2
                          header="Department"
                          data={item.Department}
                        />
                        <TextFormat2 header="Email" data={item.Email} />
                        <TextFormat2
                          header="Link"
                          data={
                            <Link to={item.Link} target="_blank">
                              {item.Link}
                            </Link>
                          }
                        />
                      </main>
                      <main className="mt-3 bg-white rounded shadow-sm p-2 px-3">
                        <section className="w-100 d-flex justify-content-between align-items-center">
                          <div>
                            <p className="m-0">Total Units</p>
                            <p className="m-0">
                              {units.sum} units / {assign.MAX} units
                            </p>
                          </div>
                          <h3
                            className={`m-0 ${
                              getCoachUnits(units.sum, assign.MAX) > 100
                                ? "text-danger"
                                : getCoachUnits(units.sum, assign.MAX) <= 100 &&
                                  getCoachUnits(units.sum, assign.MAX) > 50
                                ? "text-warning"
                                : "text-success"
                            }`}
                          >
                            {getCoachUnits(units.sum, assign.MAX)}%
                          </h3>
                        </section>
                        <section className="mt-2">
                          <main>
                            <ProgressBar
                              state={
                                getCoachUnits(units.sum, assign.MAX) > 100
                                  ? "danger"
                                  : getCoachUnits(units.sum, assign.MAX) <=
                                      100 &&
                                    getCoachUnits(units.sum, assign.MAX) >= 50
                                  ? "warning"
                                  : "success"
                              }
                              progress={getCoachUnits(units.sum, assign.MAX)}
                            />
                          </main>
                        </section>
                      </main>

                      <footer className="mt-5">
                        <small>
                          <p className="text-secondary">
                            Date Created: {item.Created}
                          </p>
                        </small>
                      </footer>
                    </section>
                  </main>
                </main>
              ))}
          </>
        }
        additional={
          <figure className="p-5">
            <img
              className="h-100 w-100 rounded object-fit-cover"
              src={`${CDNURL}${currentImage}`}
            ></img>
          </figure>
        }
      />
      <PassiveModal
        id={"Modal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <FormInput
              hidden={true}
              id="Confirm"
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={archiveEntry}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </>
  );
}
