import FooterCss from "./Footer.module.css"
import React from 'react'
import google from "../../Assets/Images/googleplay-logo.png"
import apple from "../../Assets/Images/apple-store-logo.png"
export default function Footer() {
  return <>
  {/* &lt;&gt; */}
  <footer className="bg-body-tertiary text-censter">
    {/* Grid container */}
    <div className="container p-4 pb-0">
      {/* Section: Form */}
      <section >
        <form>
          {/*Grid row*/}
          <div className="row d-flex justify-content-center">
            <h2>Get The FreshCart App</h2>
            <p>We Will Send You a Link , Open it on Your Phone To Download The App</p>
            {/*Grid column*/}
            <div className="col-10">
              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="form5Example26" className="form-control" placeholder="Email ..." />
              </div>
            </div>
            {/*Grid column*/}
            <div className="col-2">
              {/* Submit button */}
              <button data-mdb-ripple-init type="button" className="btn btn-success mb-4">
                Subscribe
              </button>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </form>
      </section>
      {/* Section: Form */}
    </div>
    {/* Grid container */}
    {/* Copyright */}
    <div className="payment container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="left">
            <div className="d-flex px-3 gap-4">
            <span className="fw-bold"> Payment Partners </span>
          <ul className="list-unstyled d-flex gap-3">
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-tiktok"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-linkedin"></i></li>
            <li><i className="fa-brands fa-youtube"></i></li>
          </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right">
            <p className="d-flex align-items-center">
              <span>Get Deliveries With FreshCart</span>
              <img height={70} src={apple} alt="apple store" />
              <img height={110} src={google} alt="google play" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
      © 2020 Copyright:
      <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    {/* Copyright */}
  </footer>
</>

}
