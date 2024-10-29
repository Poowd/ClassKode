import "../../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (3).png";
import mainlogo from "../../../src/assets/imgs/logo/ClassKode Logo (1).png";
import useConfiguration from "../../hook/useConfiguration";
import { DefaultButton } from "../../component/button/DefaultButton";
import reader from "../../assets/imgs/misc/owie.png";
import { LandingPageTopbar } from "../../component/topbar/LandingPageTopbar";
import { Content1 } from "../../component/textformat/Content1";
import { TextFormat3 } from "../../component/textformat/TextFormat3";
import { Column2 } from "../../component/textformat/Column2";
import { ClickableImage } from "../../component/popupdetails/ClickableImage";

export function Homepage() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  return (
    <main className="vh-100 overflow-hidden">
      <main className="h-100 overflow-y-auto my-0 py-0 position-relative">
        <LandingPageTopbar />
        <main className="overflow-hidden">
          <main className="w-100 tinted-black" style={{ height: "70vh" }}>
            <section className="container w-100 h-100 d-flex gap-5 align-items-center justify-content-center">
              <figure>
                <img
                  src={mainlogo}
                  className="ratio ratio-1x1"
                  style={{ height: "15em", width: "15em" }}
                />
              </figure>
              <main>
                <section className="gradient-text-golden">
                  <h5 className="m-0 fw-semibold">
                    <span>STI College Muñoz-EDSA</span>
                  </h5>
                  <h1 className="m-0 fw-bold display-1">
                    <span>Class Kode</span>
                  </h1>
                </section>
              </main>
            </section>
          </main>
          {/* Content */}
          <main className="container my-5">
            <section className="p-3 position-relative">
              <main
                className="w-100 rounded shadow-sm d-flex gap-2 align-items-center"
                style={{ height: "10em", backgroundColor: "#FBFBF9" }}
              >
                <figure>
                  <img
                    src={reader}
                    className="ratio ratio-1x1"
                    style={{ height: "15em", width: "15em" }}
                  />
                </figure>
                <section>
                  <h3 className="m-0 fw-bold gradient-text-blue-golden">
                    Welcome to Class Kode!
                  </h3>
                  <p className="m-0">
                    Login to utilize our Scheduling and Locator System.
                  </p>
                </section>
              </main>
              <main className="position-absolute top-0 end-0 px-3">
                <section className="px-3">
                  <DefaultButton
                    class="gradient-background-2 rounded px-5 py-3 z-3"
                    type="button"
                    text={<h6 className="m-0">Login</h6>}
                    icon={info.icons.navigation.back}
                    function={() => {
                      navigate("/login");
                    }}
                  />
                </section>
              </main>
            </section>
          </main>

          <Content1
            class={""}
            content={
              <Column2
                left={
                  <TextFormat3
                    title={info.details.content.content1.Title}
                    subtitle={info.details.content.content1.SubTitle}
                    details={info.details.content.content1.Content}
                    additional={info.details.content.content1.Additionals}
                  />
                }
                right={
                  <ClickableImage image={info.details.content.content1.Image} />
                }
              />
            }
          />
          <Content1
            class={"gradient-background-1"}
            content={
              <Column2
                left={
                  <ClickableImage image={info.details.content.content2.Image} />
                }
                right={
                  <TextFormat3
                    title={info.details.content.content2.Title}
                    subtitle={info.details.content.content2.SubTitle}
                    details={info.details.content.content2.Content}
                    additional={info.details.content.content2.Additionals}
                  />
                }
              />
            }
          />
          <Content1
            class={""}
            content={
              <Column2
                left={
                  <TextFormat3
                    title={info.details.content.content3.Title}
                    subtitle={info.details.content.content3.SubTitle}
                    details={info.details.content.content3.Content}
                    additional={info.details.content.content3.Additionals}
                  />
                }
                right={
                  <ClickableImage image={info.details.content.content3.Image} />
                }
              />
            }
          />

          <Content1
            class={""}
            content={
              <main>
                <header className="w-100 text-center mb-5">
                  <h1 className="fw-bold text-3xl">The Team</h1>
                </header>
                <ul className="d-flex flex-wrap justify-content-center gap-5">
                  {info &&
                    info.details.dev_team.map((item, i) => (
                      <li
                        key={i}
                        className="d-flex flex-column align-items-center"
                      >
                        <figure
                          className="ratio ratio-1x1 rounded object-fit-cover"
                          style={{ width: "10em" }}
                        >
                          <img
                            className="object-fit-cover object-position-top rounded"
                            style={{ objectPosition: "top" }}
                            src={item.Image}
                            alt="..."
                          ></img>
                        </figure>
                        <h6>{item.Name}</h6>
                        <p>{item.Role}</p>
                      </li>
                    ))}
                </ul>
              </main>
            }
          />
          <Content1
            class={"gradient-background-1"}
            content={
              <Column2
                left={
                  <ClickableImage image={info.details.content.content4.Image} />
                }
                right={
                  <TextFormat3
                    title={info.details.content.content4.Title}
                    subtitle={info.details.content.content4.SubTitle}
                    details={info.details.content.content4.Content}
                    additional={info.details.content.content4.Additionals}
                  />
                }
              />
            }
          />
          <Content1
            class={""}
            content={
              <main>
                <header className="w-100 text-center mb-5">
                  <h1 className="fw-bold text-3xl">Special Thanks</h1>
                </header>
                <main>
                  <ul className="d-flex flex-wrap justify-content-center gap-5">
                    {info &&
                      info.details.special_thanks.map((item, i) => (
                        <li
                          key={i}
                          className="d-flex flex-column align-items-center"
                        >
                          <figure
                            className="ratio ratio-1x1"
                            style={{ width: "10em" }}
                          >
                            <img
                              className="object-fit-cover object-position-top rounded"
                              style={{ objectPosition: "top" }}
                              src={item.Image}
                              alt="..."
                            ></img>
                          </figure>
                          <h6>{item.Name}</h6>
                          <p>{item.Role}</p>
                        </li>
                      ))}
                  </ul>
                </main>
              </main>
            }
          />
        </main>
        <main className="gradient-background-1 text-white">
          <div className="container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 px-lg-0 px-5 border-top">
              <div className="col mb-3">
                <img className="w-100" src={logo} alt="..."></img>
                <p className="text-white">© 2024</p>
              </div>

              <div className="col mb-3"></div>

              <div className="col-lg col-4 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      FAQs
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg col-4 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      FAQs
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg col-4 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      FAQs
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-white">
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </main>
      </main>
    </main>
  );
}
