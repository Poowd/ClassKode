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
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (3).png";

export function About() {
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
            <h1>About</h1>
            <hr />
          </section>
        </main>
        <main className="container py-0 my-0">
          <figure className="border rounded">
            <img className="w-100" src={logo} alt="..."></img>
          </figure>
        </main>
        <Content1
          class={""}
          content={
            <main className="row m-0 p-0">
              <section className="col-lg-9 pe-5">
                {info.details.about.map((about, about_index) => (
                  <TextFormat4
                    key={about_index}
                    class={"mb-5"}
                    title={about.title}
                    subtitle={about.subtitle}
                    details={about.description}
                    additional={null}
                  />
                ))}
              </section>
              <section className="col-lg-3 p-2">
                <main className="bg-white rounded shadow-sm p-3 mb-3">
                  <h5 className="text-center">Did you know?</h5>
                  <p className="m-0">
                    The word <span className="fw-semibold">Kode</span> is a
                    system of words, letters, or symbols.
                  </p>
                </main>
                <main className="bg-white rounded shadow-sm p-3">
                  <h5 className="text-center">Meet Owlie!</h5>
                  <ClickableImage image={owlie} />
                  <p>
                    Owlie is STI's Official Spirit Animal which symbolizes
                    Wisdom and Knowledge in the world of Technological
                    Innovation.
                  </p>
                  <p>
                    <span>Note: </span>
                    <span className="fst-italic">
                      This Owlie is made to fit for the Application only.
                    </span>
                  </p>
                </main>
              </section>
            </main>
          }
        />
      </main>
    </main>
  );
}
