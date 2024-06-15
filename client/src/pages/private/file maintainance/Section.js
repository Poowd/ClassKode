import React, { useEffect } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export function Section() {
  const [getdata, setGetData, getServer] = useGet();
  const [postdata, setPostData, postServer] = usePost();

  useEffect(() => {
    postServer("department-selection");
    getServer("random-code-generator");
  }, [postdata]);

  return (
    <FileMaintainanceTemplate
      control={
        <>
          <DefaultButton class="btn-outline-primary" icon={<PiGearSixFill />} />
          <Link to={"/institution/section/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={postdata.map((item, i) => (
        <main className="w-100 bg-white rounded shadow-sm p-3 mb-2 row m-0">
          <section className="col-2 p-0 m-0">
            <h6 className="p-0 m-0">{item.SCHLID}</h6>
          </section>
          <section className="col-7 p-0 m-0">
            <h6 className="p-0 m-0">{item.DepartmentName}</h6>
            <small>
              <p className="p-0 m-0 text-secondary fst-italic">
                <span>{item.DateCreated}</span>
              </p>
            </small>
          </section>
          <section className="col-2 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <p className="p-0 m-0">Available</p>
              <small>
                <p className="p-0 m-0 text-secondary fst-italic">
                  <span>Last A.Y. </span>2024-2025
                </p>
              </small>
            </div>
          </section>
          <section className="col-1 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <Link to={"/institution/section/view/" + item.DPTID}>
                <DefaultButton class="btn-primary" icon={<GrView />} />
              </Link>
            </div>
          </section>
        </main>
      ))}
    />
  );
}
