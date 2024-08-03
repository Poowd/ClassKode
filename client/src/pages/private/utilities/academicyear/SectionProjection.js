import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { MdArrowBackIosNew } from "react-icons/md";

export function SectionProjection() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [ay, setAY] = useState([]);
  const [curray, setCurrAY] = useState([]);
  const [current, setCurrent] = useState([]);
  const [prj, setPrj] = useState([]);

  useEffect(() => {
    post("sel-ay", ay, setAY);
    post("sel-cur-ay", curray, setCurrAY);
    post("sel-prj", prj, setPrj);
  }, []);

  useEffect(() => {
    curray.map((ay, i) => setCurrent(ay));
  }, [curray]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main className="h-100">
          <header className="d-flex justify-content-end align-items-center border-bottom pb-2 gap-2">
            <LinkButton
              class="btn-primary px-2"
              textclass="text-white"
              to={`/institution/academic-year/view/${current.ACYID}`}
              state={{ data: current }}
              icon={<GrView />}
            />
          </header>
          <main className="mt-2">
            <p className="p-0 m-0 fw-semibold text-secondary">Academic Year</p>
            <h5>{current.AcademicYear}</h5>
          </main>
        </main>
      }
      control={
        <>
          <div className="w-100">
            <div className="d-flex gap-2 justify-content-end">
              <DefaultButton
                class=""
                icon={<MdArrowBackIosNew />}
                function={() => navigate(-1)}
              />
              <DefaultInput placeholder="Search" />

              <LinkButton
                class="btn-primary px-2"
                textclass="text-white"
                to={"/institution/projection/create/0"}
                state={{
                  academicyear: current,
                }}
                icon={<RiStickyNoteAddLine />}
              />
            </div>
          </div>
        </>
      }
      list={
        prj.length > 0
          ? prj.map((item, i) =>
              item.ACY_Code === current.ACY_Code ? (
                <ListCard
                  slot1={`${item.Population} Students`}
                  slot2={item.Section}
                  slot3={item.PRJ_Created}
                  slot4={item.ACY_Code}
                  slot5={item.AcademicYear}
                  link={`/institution/projection/view/${item.PRJID}`}
                  state={{ data: item }}
                />
              ) : null
            )
          : "none"
      }
    />
  );
}
