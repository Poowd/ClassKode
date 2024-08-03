import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";
import { MdArrowBackIosNew } from "react-icons/md";

export function Room() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);

  useEffect(() => {
    post("sel-rom", data, setData);
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
          <Link to={"/institution/room/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.ROMID}
          slot2={item.Room}
          slot3={item.ROM_Created}
          slot4={item.Facility}
          slot5={`${item.Building} - ${item.Floor}`}
          link={`/institution/room/view/${item.ROMID}`}
          state={{ data: item }}
        />
      ))}
    />
  );
}
