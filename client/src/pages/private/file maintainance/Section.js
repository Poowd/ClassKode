import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";

export function Section() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    post("section", data, setData);
  }, [data]);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultInput placeholder="Search" />
          <Link to={"/institution/section/generate/0"}>
            <DefaultButton
              class="btn-outline-primary"
              icon={<PiGearSixFill />}
            />
          </Link>

          <Link to={"/institution/section/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.SCTID}
          slot2={item.Section}
          slot3={item.SCT_Created}
          slot4={item.AcademicLevel}
          slot5={
            <span>
              {item.YearLevel} - {item.Semester}
            </span>
          }
          link={"/institution/section/view/" + item.SCTID}
          state={{ data: item }}
        />
      ))}
    />
  );
}
