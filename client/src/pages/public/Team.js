import "../../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import { LandingPageTopbar2 } from "../../component/topbar/LandingPageTopbar2";
import { Content1 } from "../../component/textformat/Content1";
import { DefaultButton } from "../../component/button/DefaultButton";
import owlie from "../../assets/imgs/misc/owie.png";
import { ClickableImage } from "../../component/popupdetails/ClickableImage";
import { TextFormat4 } from "../../component/textformat/TextFormat4";

export function Team() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  return (
    <main className="vh-100 overflow-hidden">
      <main className="h-100 overflow-y-auto my-0 py-0 position-relative">
        <LandingPageTopbar2 />
        <main className="container mt-5">
          <section>
            <DefaultButton
              class="rounded-pill border-0 pe-5 mb-3"
              type="button"
              text={"Back"}
              icon={info.icons.navigation.back}
              function={() => {
                navigate("/");
              }}
            />
            <h1>Team</h1>
            <hr />
          </section>
        </main>
        <Content1
          class={""}
          content={
            <main className="">
              <section className="">
                <h3 className="text-center mb-5 fw-bold mt-0 p-0">
                  Team Members
                </h3>
                <main className="d-flex flex-wrap">
                  {info.details.dev_team.map((team, team_index) => (
                    <main
                      key={team_index}
                      className={`d-lg-flex gap-3 mb-5 ${
                        team_index == 0 ? "w-100" : "w-50"
                      }`}
                    >
                      <section>
                        <figure
                          className="ratio ratio-1x1 rounded object-fit-cover border"
                          style={{ width: team_index == 0 ? "30em" : "10em" }}
                        >
                          <img
                            className="object-fit-cover object-position-top rounded"
                            style={{ objectPosition: "top" }}
                            src={team.Image}
                            alt="..."
                          ></img>
                        </figure>
                      </section>
                      <section className="d-flex flex-column justify-content-end">
                        <main>
                          <section className="mb-3">
                            <h5
                              className={`fw-semibold ${
                                team_index == 0 ? "fs-1" : "fs-5"
                              }`}
                            >
                              {team.Name}
                            </h5>
                            <h6
                              className={`fw-semibold ${
                                team_index == 0 ? "fs-3" : "text-md"
                              }`}
                            >
                              {team.Role}
                            </h6>
                            <p className="m-0">{team.Quote}</p>
                          </section>
                        </main>
                      </section>
                    </main>
                  ))}
                </main>
                <h3 className="text-center mb-5 fw-bold mt-5 p-0">
                  Advisers & Coordinator/s
                </h3>
                <main className="d-flex flex-wrap">
                  {info.details.special_thanks.map((team, team_index) => (
                    <main
                      className={`d-lg-flex gap-3 mb-5 w-50`}
                      key={team_index}
                    >
                      <section>
                        <figure
                          className="ratio ratio-1x1 rounded object-fit-cover border"
                          style={{ width: "10em" }}
                        >
                          <img
                            className="object-fit-cover object-position-top rounded"
                            style={{ objectPosition: "top" }}
                            src={team.Image}
                            alt="..."
                          ></img>
                        </figure>
                      </section>
                      <section className="d-flex flex-column justify-content-end">
                        <main>
                          <section className="mb-3">
                            <h5 className={`fw-semibold`}>{team.Name}</h5>
                            <h6 className={`fw-semibold text-md`}>
                              {team.Role}
                            </h6>
                            <p className="m-0">{team.Quote}</p>
                          </section>
                        </main>
                      </section>
                    </main>
                  ))}
                </main>
              </section>
            </main>
          }
        />
      </main>
    </main>
  );
}
