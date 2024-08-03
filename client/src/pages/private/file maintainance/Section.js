import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";
import { LinkButton } from "../../../component/button/LinkButton";
import { MdArrowBackIosNew } from "react-icons/md";

export function Section() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);

  useEffect(() => {
    post("sel-sect", data, setData);
  }, [data]);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultButton
            class=""
            icon={<MdArrowBackIosNew />}
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" />
          <LinkButton
            class="btn-outline-primary"
            textclass="text-primary"
            to={"/institution/section/generate/0"}
            icon={<PiGearSixFill />}
          />
          <LinkButton
            class="btn-primary"
            textclass="text-white"
            to={"/institution/section/create/0"}
            icon={<RiStickyNoteAddLine />}
          />
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.SCTID}
          slot2={item.Section}
          slot3={item.SCT_Created}
          slot4={item.AcademicLevel}
          slot5={`${item.YearLevel} - ${item.Semester}`}
          link={`/institution/section/view/${item.SCTID}`}
          state={{ data: item }}
        />
      ))}
    />
  );
}
