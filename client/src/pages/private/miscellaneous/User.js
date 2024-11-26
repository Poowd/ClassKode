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
  const [toArchive, setToArchive] = useState(null);
  const [search, setSearch] = useState({
    Confirm: "",
    Search: "",
    setbyRegister: "",
    setbyType: "",
  });
  const [code, setCode] = useState("");
  const [dataChange] = useHandleChange(setSearch);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_get("user-list", setUsers);
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === search.Confirm) {
      data_post("user-archive", { data: toArchive.SCHLID }, setData);
      showToast(
        info.icons.others.info,
        "Department",
        `Department ${toArchive.LastName}, ${toArchive.FirstName} is set to archive!`
      );
      setTimeout(() => {
        data_get("random-code-generator", setCode);
        data_get("user-list", setUsers);
      }, 1000); // 2 second delay
    } else {
      showModal(
        "Modal",
        "Archive Entry",
        <p>
          <span>Type the code </span>
          <span className="fw-bold text-black">{code}</span>
          <span> to archive </span>
          <span className="fw-bold text-black">{`${toArchive.LastName}, ${toArchive.FirstName}`}</span>
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
            <DefaultInput
              placeholder="Search"
              id="Search"
              trigger={dataChange}
            />
            <DefaultDropdown
              class="border p-2"
              reversed={true}
              icon={info.icons.forms.filter}
              dropdownitems={
                <main className="d-flex gap-3 p-3">
                  <section>
                    <h6>Status</h6>
                    <DefaultDropdownItem
                      title={"Registered"}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyRegister: "Registered",
                        }))
                      }
                    />
                    <DefaultDropdownItem
                      title={"Not Registered"}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyRegister: "Not Registered",
                        }))
                      }
                    />
                  </section>
                  <section>
                    <h6>Type</h6>
                    <DefaultDropdownItem
                      title={"Manager"}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyType: "Manager",
                        }))
                      }
                    />
                    <DefaultDropdownItem
                      title={"Admin"}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyType: "Admin",
                        }))
                      }
                    />
                    <DefaultDropdownItem
                      title={"User"}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyType: "User",
                        }))
                      }
                    />
                  </section>
                </main>
              }
            />
            <LinkButton
              to={"/user/create/0"}
              class="primary-outline-gradient"
              icon={info.icons.forms.add}
            />
            <DefaultButton
              class="primary-gradient px-2"
              icon={info.icons.forms.generate}
              text="Generate"
              function={() => {
                navigate("/user/generate/0");
              }}
            />
          </>
        }
        list={
          <>
            <section>
              <ul className="p-0 m-0 mb-2 d-flex gap-2 flex-wrap">
                <li className={search.Search === "" ? "visually-hidden" : ""}>
                  <DefaultButton
                    class="primary-outline-gradient px-2"
                    text={search.Search}
                    function={() => {
                      document.getElementById(`Search`).value = "";
                      setSearch((prev) => ({
                        ...prev,
                        Search: "",
                      }));
                    }}
                  />
                </li>
                <li
                  className={
                    search.setbyRegister === "" ? "visually-hidden" : ""
                  }
                >
                  <DefaultButton
                    class="primary-outline-gradient px-2"
                    text={search.setbyRegister}
                    function={() =>
                      setSearch((prev) => ({
                        ...prev,
                        setbyRegister: "",
                      }))
                    }
                  />
                </li>
                <li
                  className={search.setbyType === "" ? "visually-hidden" : ""}
                >
                  <DefaultButton
                    class="primary-outline-gradient px-2"
                    text={search.setbyType}
                    function={() =>
                      setSearch((prev) => ({
                        ...prev,
                        setbyType: "",
                      }))
                    }
                  />
                </li>
              </ul>
            </section>
            {users &&
              users.map((item) =>
                search.Search === "" ||
                item.SCHLID.toLowerCase().includes(
                  search.Search.toLowerCase()
                ) ||
                item.Email.toLowerCase().includes(
                  search.Search.toLowerCase()
                ) ||
                item.LastName.toLowerCase().includes(
                  search.Search.toLowerCase()
                ) ||
                item.FirstName.toLowerCase().includes(
                  search.Search.toLowerCase()
                ) ? (
                  search.setbyRegister === "" ||
                  (item.AcademicCode === null &&
                    search.setbyRegister === "Not Registered") ||
                  (item.AcademicCode !== null &&
                    search.setbyRegister === "Registered") ? (
                    search.setbyType === "" ||
                    search.setbyType === item.UserType ? (
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
                              class="warning-color"
                              textclass=""
                              icon={info.icons.forms.edit}
                            />
                            <DefaultButton
                              class="danger-color px-2"
                              icon={info.icons.forms.archive}
                              function={() => {
                                setToArchive(item);
                                showModal(
                                  "Modal",
                                  "Archive Entry",
                                  <p>
                                    <span>Type the code </span>
                                    <span className="fw-bold text-black">
                                      {code}
                                    </span>
                                    <span> to archive </span>
                                    <span className="fw-bold text-black">{`${item.LastName}, ${item.FirstName}`}</span>
                                  </p>
                                );
                              }}
                            />
                          </>
                        }
                      />
                    ) : null
                  ) : null
                ) : null
              )}
          </>
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
              value={search.Confirm}
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
