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
import aboutImage from "./assest/images/about-img-1.jpg";
function About() {
  return (
    <div>
      <NavbarHome></NavbarHome>
      <div className="wrapper">
        <div className="divider div-transparent"></div>
      </div>

      <section className="py-3 py-md-5">
      <div className="container">
        <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <img className="img-fluid rounded" loading="lazy" src={aboutImage}  alt="About 1" />
          </div>
          <div className="col-12 col-lg-6 col-xl-7">
            <div className="row justify-content-xl-center">
              <div className="col-12 col-xl-11">
                <h2 className="mb-3">Who Are We?</h2>
                <p className="lead fs-4 text-secondary mb-3">We are committed to connecting you with a wide range of high-quality services right at your doorstep. Our goal is to simplify your life by offering convenient, reliable solutions that meet your everyday needs. Choose Fingertips for trusted professionals and exceptional service, every time.</p>
                <p className="mb-5">At Fingertips, we are passionate about bringing expert services directly to your doorstep. Our carefully selected professionals are leaders in their fields, equipped to handle your needs with the utmost precision and care. From the initial consultation to the final support, we are dedicated to ensuring your satisfaction every step of the way.</p>
                <div className="row gy-4 gy-md-0 gx-xxl-5X">
                  <div className="col-12 col-md-6">
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="h4 mb-3">Service Hub</h2>
                        <p className="text-secondary mb-0">We are developing a digital platform that simplifies your life by seamlessly integrating a wide array of services accessible from anywhere.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="h4 mb-3">City Pro Services</h2>
                        <p className="text-secondary mb-0">At CityPro Services, we are committed to innovation by blending simple, proven approaches with advanced ideas to deliver outstanding services tailored to your urban needs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<center><iframe width="560" height="315" src="https://www.youtube.com/embed/mAd2wfSZw5A?si=RGuSCag9ZdlQiAu9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>
    
       <br />
      <FooterHome></FooterHome>
    </div>
  );
}
export default About;
