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

export function Department() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);

  useEffect(() => {
    post("sel-dept", data, setData);
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
          <Link to={"/institution/department/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.DPT_Code}
          slot2={item.Department}
          slot3={item.DPT_Created}
          slot4={item.DPT_Abbreviation}
          slot5={item.DPT_Abbreviation}
          link={`/institution/department/view/${item.DPTID}`}
          state={{ data: item }}
        />
      ))}
    />
  );
}
