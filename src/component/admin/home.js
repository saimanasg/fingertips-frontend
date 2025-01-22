import React from "react";
import "./home.css";
import NavbarHome from "./navbarhome";
import FooterHome from "./footer";
import homeImg1 from "./assest/images/home2.png";
import homeImg2 from "./assest/images/home1.png";
import service1 from "./assest/images/service1.webp";
import service2 from "./assest/images/service2.webp";
import service3 from "./assest/images/service3.webp";
import service4 from "./assest/images/service4.webp";
import service5 from "./assest/images/service5.webp";
import service6 from "./assest/images/service6.webp";
import service7 from "./assest/images/service7.webp";
function Home() {
  return (
    <div>
      <NavbarHome></NavbarHome>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <i
              className="fa-regular fa-clone fa-2xl"
              style={{ color: "#74c0fc", margin: "30px" }}
            ></i>
            <h1>Welcome!</h1>
            <h2 id="tag">
              <p>Caring for your home,</p>
              <p>made easy!</p>
            </h2>
            <br />
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for the Services"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
            <br />
            <h4>
              <p>Services starting as low as $20</p>
            </h4>
            <h6>
              <p>
                {/* If you find services cheaper than $20,<br />
              then we guarantee 100% money back!  */}
                Discover quality without compromise today
              </p>
            </h6>
          </div>
          <div className="col-lg-3 col-md-3 d-none d-sm-block position-relative">
            <div className="position-absolute top-0 start-0">
              <img
                src={homeImg1}
                className="rounded float-end"
                id="homeImg1"
                alt="Responsive image"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 d-none d-sm-block position-relative">
            <div className="position-absolute top-0 start-0">
              <img
                src={homeImg2}
                className="rounded float-end"
                id="homeImg2"
                alt="Responsive image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-7 col-sm-7">
            <h5 style={{ textAlign: "center" }}>
              Popular services in Boston, Massachusetts
            </h5>
          </div>
        </div>
        <br />
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-8">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="false"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={service1} className="d-block w-100" alt="..." />
                  {/* <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>  */}
                </div>
                <div className="carousel-item">
                  <img src={service2} className="d-block w-100" alt="..." />
                  {/* <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>  */}
                </div>
                <div className="carousel-item">
                  <img src={service3} className="d-block w-100" alt="..." />
                  {/* <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>  */}
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="card" style={{ width: "14rem" }}>
              <img src={service4} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Interior painting</h5>
                <p className="card-text">
                  Paint your walls and get a new look!
                </p>
                <a href="#" className="btn btn-primary">
                  Get it today
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="card" style={{ width: "14rem" }}>
              <img src={service5} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Heating System</h5>
                <p className="card-text">Heating System Maintenance with us!</p>
                <a href="#" className="btn btn-primary">
                  Get it today
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="card" style={{ width: "14rem" }}>
              <img src={service7} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Appliance Repair</h5>
                <p className="card-text">Get your appliances repaired today!</p>
                <a href="#" className="btn btn-primary">
                  Get it today
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 d-none d-lg-block">
            <div className="card" style={{ width: "14rem" }}>
              <img src={service6} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Furniture Moving</h5>
                <p className="card-text">
                  We help you to relocate your furniture!
                </p>
                <a href="#" className="btn btn-primary">
                  Get it today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <br />

      <div
        className="container"
        style={{ backgroundColor: "#e2edf6", padding: "10px" }}
      >
        <div style={{ justifyContent: "center" }}>
          <h2>FAQs</h2>
        </div>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Where do we provide services?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                We provide services in multiple locations.
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Massachusetts</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      10 Cities
                    </span>
                  </li>
                  {/* <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">New York</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      5 Cities
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Connecticut</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      3 Cities
                    </span>
                  </li> */}
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Do you offer discounts for bulk orders?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, we offer discounts for bulk orders. Please contact our
                sales team for more information.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Do you offer refunds?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, we offer refunds for products returned within 30 days of
                purchase. Please refer to our refund policy for more details.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                What are your business hours?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Our business hours are Monday to Friday, 9:00 AM to 5:00 PM. We
                are closed on weekends and public holidays.
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>
      <br />
      <FooterHome></FooterHome>
    </div>
  );
}
export default Home;
