import "../../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useConfiguration from "../../hook/useConfiguration";
import { LandingPageTopbar2 } from "../../component/topbar/LandingPageTopbar2";
import { Content1 } from "../../component/textformat/Content1";
import { Column2 } from "../../component/textformat/Column2";
import { TextFormat3 } from "../../component/textformat/TextFormat3";
import { PopUpDetails } from "../../component/popupdetails/PopUpDetails";
import { ProgressBar } from "../../component/progressbar/ProgressBar";
import { DefaultButton } from "../../component/button/DefaultButton";
import owlie from "../../assets/imgs/misc/owie.png";
import { ClickableImage } from "../../component/popupdetails/ClickableImage";
import { TextFormat4 } from "../../component/textformat/TextFormat4";

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
            <h1>About Page</h1>
            <hr />
          </section>
        </main>
        <Content1
          class={""}
          content={
            <main className="row m-0 p-0">
              <section className="col-lg-9">
                <TextFormat4
                  class={"mb-5"}
                  title={"What is Class Kode?"}
                  subtitle={"A Class Scheduling and Faculty Locator System"}
                  details={"a"}
                  additional={null}
                />
                <TextFormat4
                  class={"mb-5"}
                  title={"Why our System is so Significant?"}
                  subtitle={"In and Out of STI College Munoz-EDSA"}
                  details={"a"}
                  additional={null}
                />
                <TextFormat4
                  class={"mb-5"}
                  title={"About the Group of Developers"}
                  subtitle={"Students of STI College Munoz-EDSA"}
                  details={"a"}
                  additional={null}
                />
              </section>
              <section className="col-lg-3 p-2">
                <main className="bg-white rounded shadow-sm p-3 mb-3">
                  <h5>Did you know?</h5>
                  <p>
                    The meaning of the word{" "}
                    <span className="fw-semibold">' Kode '</span> comes from{" "}
                    <span className="fw-semibold">' Code '</span> which has
                    multiple meanings depending on how you use it.
                  </p>
                  <p>
                    The whole point of Class Kode is to create a system that
                    will cater encoding of data entries and to be able to decode
                    the complexity and lengthly process of plotting schedules in
                    an institution.
                  </p>
                </main>
                <main className="bg-white rounded shadow-sm p-3">
                  <h5>Meet Owlie!</h5>
                  <ClickableImage image={owlie} />
                  <p>
                    The STI College's spirit animal is an owl? Meet Owlie, the
                    Official School Mascot of STI College symbolizing Wisdom and
                    Knowledge upon booming Technological Industry.
                  </p>
                  <p>
                    <span>Take Note: </span>
                    <span className="fst-italic">
                      This is not the Official Owlie. It was made to go along
                      with the Application's Theme while still containing
                      features from the original.
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
