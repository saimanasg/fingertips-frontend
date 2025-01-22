// Added by Srinjana
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
import service8 from "./assest/images/InteriorPainting.jpeg";
import service9 from "./assest/images/heatingsystems.jpeg";
import service10 from "./assest/images/applianceReapir.jpeg";
import service11 from "./assest/images/furnitureMoving.jpeg";
import allservice5 from "./assest/images/testimonial-img-1.jpg";
import allservice6 from "./assest/images/testimonial-img-2.jpg";
import allservice7 from "./assest/images/testimonial-img-4.jpg";
function AllServices() {
  return (
    <div>
      <NavbarHome></NavbarHome>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>

      <section className="py-3 py-md-5">
      <div className="container overflow-hidden">
        <div className="row gy-5">

          {/* First Blog Post */}
          <div className="col-12">
            <div className="row align-items-center gy-3 gy-md-0 gx-xl-5">
              <div className="col-xs-12 col-md-6">
                <div className="img-wrapper position-relative bsb-hover-push">
                  <a href="#!">
                    <span className="badge rounded-pill text-bg-warning position-absolute top-0 start-0 m-3"></span>
                    <img className="img-fluid rounded w-100 h-100 object-fit-cover" loading="lazy" src={service8} alt="Sports" />
                  </a>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div>
                  <p className="text-secondary mb-1">Nov 1, 2023</p>
                  <h2 className="h1 mb-3"><a className="link-dark text-decoration-none" href="#!">Professional Interior Painting Services</a></h2>
                  <p className="mb-4">Experience excellence with our Professional Interior Painting Services. We bring precision, quality, and vibrant new life to every space we touch.</p>
                  <a className="btn btn-primary" href="mailto:email@example.com" target="_self">Email us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Blog Post */}
          <div className="col-12">
            <div className="row align-items-center flex-row-reverse gy-3 gy-md-0 gx-xl-5">
              <div className="col-xs-12 col-md-6">
                <div className="img-wrapper position-relative bsb-hover-push">
                  <a href="#!">
                    <span className="badge rounded-pill text-bg-warning position-absolute top-0 end-0 m-3"></span>
                    <img className="img-fluid rounded w-100 h-100 object-fit-cover" loading="lazy" src={service9} alt="Travel" />
                  </a>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div>
                  <p className="text-secondary mb-1">Oct 10, 2023</p>
                  <h2 className="h1 mb-3"><a className="link-dark text-decoration-none" href="#!">Ensure Comfort with Our Heating Maintenance Service</a></h2>
                  <p className="mb-4">Ensure lasting warmth and efficiency in your home with our Heating Maintenance Service. We specialize in keeping your system running smoothly, providing you with reliable comfort and peace of mind all year round.</p>
                  <a className="btn btn-primary" href="mailto:email@example.com" target="_self">Email us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Third Blog Post */}
          <div className="col-12">
            <div className="row align-items-center gy-3 gy-md-0 gx-xl-5">
              <div className="col-xs-12 col-md-6">
                <div className="img-wrapper position-relative bsb-hover-push">
                  <a href="#!">
                    <span className="badge rounded-pill text-bg-warning position-absolute top-0 start-0 m-3"></span>
                    <img className="img-fluid rounded w-100 h-100 object-fit-cover" loading="lazy" src={service10} alt="Photography" />
                  </a>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div>
                  <p className="text-secondary mb-1">Sep 17, 2023</p>
                  <h2 className="h1 mb-3"><a className="link-dark text-decoration-none" href="#!">Professional Appliance Repair Solutions</a></h2>
                  <p className="mb-4">Depend on our Professional Appliance Repair Solutions to get your household equipment back in top shape. We offer fast, efficient service to ensure your appliances operate smoothly, extending their lifespan and enhancing your home's functionality.</p>
                  <a className="btn btn-primary" href="mailto:email@example.com" target="_self">Email us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Blog Post */}
          <div className="col-12">
            <div className="row align-items-center flex-row-reverse gy-3 gy-md-0 gx-xl-5">
              <div className="col-xs-12 col-md-6">
                <div className="img-wrapper position-relative bsb-hover-push">
                  <a href="#!">
                    <span className="badge rounded-pill text-bg-warning position-absolute top-0 end-0 m-3"></span>
                    <img className="img-fluid rounded w-100 h-100 object-fit-cover" loading="lazy" src={service11} alt="Food" />
                  </a>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div>
                  <p className="text-secondary mb-1">Aug 23, 2023</p>
                  <h2 className="h1 mb-3"><a className="link-dark text-decoration-none" href="#!">Expert Furniture Relocation Solutions</a></h2>
                  <p className="mb-4">Experience seamless and hassle-free furniture relocation with our Expert Furniture Relocation Solutions. We ensure your belongings are handled with care, providing a smooth transition to your new space with precision and professionalism.</p>
                  <a className="btn btn-primary" href="mailto:email@example.com" target="_self">Email us</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    <section className="bg-light py-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="fs-6 text-secondary mb-2 text-uppercase text-center">Happy Customers</h2>
            <p className="display-5 mb-4 mb-md-5 text-center">We deliver what we promise. See what clients are expressing about us.</p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>

      <div className="container overflow-hidden">
        <div className="row gy-4 gy-md-0 gx-xxl-5">
          {/* First Testimonial */}
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src={allservice5} alt="Luna John" />
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">I was thoroughly impressed with the professionalism and efficiency of this team. They handled our furniture move with utmost care, and everything arrived in perfect condition. Highly recommend their expert furniture relocation services for anyone facing a big move!</blockquote>
                    <h4 className="mb-2">Luna John</h4>
                    <h5 className="fs-6 text-secondary mb-0">Customer</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          {/* Second Testimonial */}
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src={allservice6} alt="Mark Smith" />
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="4" data-bsb-star-off="1"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">Absolutely top-notch service from start to finish! Their technicians were knowledgeable and friendly, and they fixed my dishwasher quickly. It's been running smoothly ever since. I'm really impressed by their professionalism.</blockquote>
                    <h4 className="mb-2">Mark Smith</h4>
                    <h5 className="fs-6 text-secondary mb-0">Customer</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          {/* Third Testimonial */}
          <div className="col-12 col-md-4">
            <div className="card border-0 border-bottom border-primary shadow-sm">
              <div className="card-body p-4 p-xxl-5">
                <figure>
                  <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" src={allservice7} alt="Luke Reeves" />
                  <figcaption>
                    <div className="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                    <blockquote className="bsb-blockquote-icon mb-4">We hired them for a full interior repaint, and the results were nothing short of spectacular. The painters were punctual, tidy, and incredibly meticulous about every detail. Our home looks completely transformed. </blockquote>
                    <h4 className="mb-2">Luke Reeves</h4>
                    <h5 className="fs-6 text-secondary mb-0">Customer</h5>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      
      <br />
      <FooterHome></FooterHome>
    </div>
  );
}
export default AllServices;
