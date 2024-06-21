import React, { useEffect } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { FaFilter } from "react-icons/fa6";

export function Coach() {
  const navigate = useNavigate();
  const [getdata, setGetData, getServer] = useGet();

  const [postdata, setPostData, postServer] = usePost();

  useEffect(() => {
    postServer("coach");
    getServer("random-code-generator");
  }, [postdata]);

  return (
    <FileMaintainanceTemplate
      control={
        <>
          <DefaultDropdown
            class="border-0"
            reversed={true}
            icon={<FaFilter />}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <DefaultDropdownItem title={"Contact"} />
                <DefaultDropdownItem title={"Visit us"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
          <DefaultButton class="btn-outline-primary" icon={<PiGearSixFill />} />
          <DefaultButton
            class="btn-primary"
            icon={<RiStickyNoteAddLine />}
            function={() => {
              navigate("/institution/coach/create/0");
            }}
          />
        </>
      }
      list={postdata.map((item, i) => (
        <main className="w-100 bg-white rounded shadow-sm p-3 mb-2 row m-0">
          <section className="col-2 p-0 m-0">
            <h6 className="p-0 m-0">{item.SCHLID}</h6>
          </section>
          <section className="col-7 p-0 m-0">
            <h6 className="p-0 m-0">
              {item.FirstName + " "}
              {item.MiddleInitial !== (null || "")
                ? " " + item.MiddleInitial + ". "
                : " "}
              {item.LastName + " "}
            </h6>
            <small>
              <p className="p-0 m-0 text-secondary fst-italic">
                <span>{item.CCH_Created}</span>
              </p>
            </small>
          </section>
          <section className="col-2 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <p className="p-0 m-0">{item.DPT_Abbreviation}</p>
              <small>
                <p className="p-0 m-0 text-secondary fst-italic">
                  <span>{item.Email}</span>
                </p>
              </small>
            </div>
          </section>
          <section className="col-1 p-0 m-0">
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
              <Link
                to={"/institution/coach/view/" + item.CCHID}
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
