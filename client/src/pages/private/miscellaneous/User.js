import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";
import useHandleChange from "../../../hook/useHandleChange";
import useModal from "../../../hook/useModal";
import { PassiveModal } from "../../../component/modal/PassiveModal";
import { FormInput } from "../../../component/input/FormInput";
import { useToasty } from "../../../hook/useToasty";
import { DefaultToast } from "../../../component/toast/DefaultToast";

export function User() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [users, setUsers] = useState([]);
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_get("user-list", setUsers);
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      data_post("department-archive", { data: params.id }, setData);
      showToast(
        info.icons.others.info,
        "Department",
        `Department ${data[0].Department} is set to archive!`
      );
      setTimeout(() => {
        data_get("random-code-generator", setCode);
        navigate(-1);
      }, 2500); // 2 second delay
    } else {
      showModal(
        "Modal",
        "Archive Entry",
        <p>
          <span>Type the code </span>
          <span className="fw-bold text-black">{code}</span>
          <span> to archive </span>
          <span className="fw-bold text-black">{data[0].Department}</span>
        </p>
      );
    }
  };

  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={<NoDisplay />}
        control={
          <>
            <DefaultButton
              class=""
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <DefaultInput placeholder="Search" />
            <DefaultDropdown
              class="border p-2"
              reversed={true}
              icon={info.icons.forms.filter}
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
              icon={info.icons.forms.generate}
              function={() => {
                navigate("/user/generate/0");
              }}
            />
            <LinkButton
              to={"/user/create/0"}
              class="btn-primary"
              textclass="text-white"
              icon={info.icons.forms.add}
            />
          </>
        }
        list={
          users &&
          users.map((item) => (
            <ListCard
              slot1={item.SCHLID}
              slot2={`${item.FirstName} ${item.LastName}`}
              slot3={item.Email}
              slot4={`${item.UserType} ${item.PermissionLevel}`}
              slot5={
                item.AcademicCode !== null
                  ? item.AcademicCode
                  : "Not Registered"
              }
              view={info.icons.details}
              link={null}
              state={null}
              custom={
                <>
                  <LinkButton
                    to={`/user/edit/${item.UUID}`}
                    class="btn-warning"
                    textclass=""
                    icon={info.icons.forms.edit}
                  />
                  <DefaultButton
                    class="btn-danger px-2"
                    icon={info.icons.forms.archive}
                    function={() =>
                      showModal(
                        "Modal",
                        "Archive Entry",
                        <p>
                          <span>Type the code </span>
                          <span className="fw-bold text-black">{code}</span>
                          <span> to archive </span>
                          <span className="fw-bold text-black">
                            {item.SCHLID}
                          </span>
                        </p>
                      )
                    }
                  />
                </>
              }
            />
          ))
        }
      />
      <PassiveModal
        id={"Modal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <FormInput
              hidden={true}
              id="Confirm"
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={archiveEntry}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </>
  );
}
