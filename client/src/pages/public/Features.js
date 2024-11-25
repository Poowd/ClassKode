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

export function Features() {
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
            <h1>Features</h1>
            <hr />
          </section>
        </main>
        <Content1
          class={""}
          content={
            <main className="">
              <section className="">
                {info.details.features.map((feature, feature_index) => (
                  <TextFormat4
                    key={feature_index}
                    class={"mb-5"}
                    title={feature.title}
                    subtitle={feature.subtitle}
                    details={feature.description}
                    additional={null}
                  />
                ))}
              </section>
            </main>
          }
        />
      </main>
    </main>
  );
}
