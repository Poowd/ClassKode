import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";

export function Course() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    post("course", data, setData);
  }, [data]);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  return (
    <FileMaintainanceTemplate
      control={
        <>
          <DefaultInput placeholder="Search" />
          <DefaultButton class="btn-outline-primary" icon={<PiGearSixFill />} />
          <Link to={"/institution/course/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <main className="w-100 bg-white rounded shadow-sm p-3 mb-2 row m-0">
          <section className="col-2 p-0 m-0">
            <h6 className="p-0 m-0">{item.CRS_Code}</h6>
          </section>
          <section className="col-7 p-0 m-0">
            <h6 className="p-0 m-0">{item.Course}</h6>
            <small>
              <p className="p-0 m-0 text-secondary fst-italic">
                <span>{item.CRS_Created}</span>
              </p>
            </small>
          </section>
          <section className="col-2 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <p className="p-0 m-0 text-end">{item.AcademicLevel}</p>
              <small>
                <p className="p-0 m-0 text-secondary fst-italic">
                  <span></span>
                </p>
              </small>
            </div>
          </section>
          <section className="col-1 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <Link
                to={"/institution/course/view/" + item.CRSID}
                state={{ data: item }}
              >
                <DefaultButton class="btn-primary" icon={<GrView />} />
              </Link>
            </div>
          </section>
        </main>
      ))}
    />
  );
}
