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
import { MdArrowBackIosNew } from "react-icons/md";

export function Program() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);
  useEffect(() => {
    post("sel-prg", data, setData);
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
          <Link to={"/institution/program/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.PRG_Code}
          slot2={item.Program}
          slot3={item.PRG_Created}
          slot4={"Available"}
          slot5={"2024-2025"}
          link={`/institution/program/view/${item.PRGID}`}
          state={{ data: item }}
        />
      ))}
    />
  );
}
