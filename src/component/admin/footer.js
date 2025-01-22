import React from "react";

function FooterHome() {
  return (
    <footer className="bg-light text-dark">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We provide services for you to make your home beautiful and a
              happy place to live. We also help you to build your house of
              dreams along with our services.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="mailto:fingertips.root@gmail.com">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <strong>Fingertips</strong>
              <br />
              123 Street, Boston
              <br />
              Massachusetts, 12345
              <br />
              <abbr title="Phone">
                {" "}
                <span>&#9742;</span>(123) 456-7890
              </abbr>
              <br />
              <abbr title="Email">
                <span>&#9993;</span>
                fingertips.root@gmail.com
              </abbr>
            </address>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; 2024 Fingertips
      </div>
    </footer>
  );
}
export default FooterHome;
