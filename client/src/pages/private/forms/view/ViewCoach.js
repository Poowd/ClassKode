import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { DataControlView } from "../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../component/datacontrolview/DataControlViewItem";
import { GrView } from "react-icons/gr";

export function ViewCoach() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [data, setData] = useState([state.data]);

  return (
    <DataControllerTemplate
      title={"View A Coach"}
      description={"This module views a coach"}
      control={
        <>
          <DefaultButton
            class="btn-primary"
            icon={<IoMdArrowRoundBack />}
            function={() => {
              navigate("/institution/coach");
            }}
          />
          <Link
            to={"/institution/coach/edit/" + params.id}
            state={{ data: data }}
          >
            <DefaultButton class="btn-warning" icon={<GrView />} />
          </Link>
          <DefaultButton
            class="btn-danger px-2"
            icon={<GrView />}
            function={() => {
              navigate("/institution/coach");
            }}
          />
        </>
      }
      content={
        <>
          {data.map((item, i) => (
            <main key={i} className="px-0 py-3 m-0">
              <header>
                <h1>
                  <span>{item.CCH_Gender === "MALE" ? "Mr. " : "Ms. "}</span>
                  <span>{item.CCH_FirstName}</span>
                  <span>
                    {item.CCH_MiddleInitial !== null
                      ? " " + item.CCH_MiddleInitial + ". "
                      : ""}
                  </span>
                  <span>{item.CCH_LastName}</span>
                </h1>
              </header>

              <DataControlView
                content={
                  <>
                    <DataControlViewItem
                      label={"School ID"}
                      content={item.SCHLID}
                    />
                    <DataControlViewItem
                      label={"Department"}
                      content={item.DPT_Department}
                    />
                    <DataControlViewItem
                      label={"Contacts"}
                      content={
                        <>
                          <span className="d-block">{item.CCH_Email}</span>
                          <span className="d-block">{item.CCH_Contact}</span>
                          <span className="d-block">
                            <a href={item.CCH_Facebook} target="_blank">
                              {item.CCH_Facebook}
                            </a>
                          </span>
                        </>
                      }
                    />
                    <DataControlViewItem
                      label={"Created"}
                      content={item.CCH_Created}
                    />
                  </>
                }
              />
            </main>
          ))}
        </>
      }
      additional={<></>}
    />
  );
}
