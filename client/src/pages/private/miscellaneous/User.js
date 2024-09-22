import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { useNavigate } from "react-router-dom";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";

export function User() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [users, setUsers] = useState([]);
  const [info] = useConfiguration();

  useEffect(() => {
    data_post("user-list", users, setUsers);
  }, [users]);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultButton
            class=""
            icon={info.icons.back}
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={info.icons.filter}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
          <DefaultButton
            class="btn-primary"
            icon={info.icons.generate}
            function={() => {
              navigate("/user/generate/0");
            }}
          />
          <DefaultButton
            class="btn-primary"
            icon={info.icons.add}
            function={() => {
              navigate("");
            }}
          />
        </>
      }
      list={users.map((item) => (
        <ListCard
          slot1={item.SCHLID}
          slot2={`${item.FirstName} ${item.LastName}`}
          slot3={item.UUID_Created}
          slot4={item.UserType}
          slot5={item.Email}
          view={info.icons.details}
          link={null}
          state={null}
        />
      ))}
    />
  );
}
