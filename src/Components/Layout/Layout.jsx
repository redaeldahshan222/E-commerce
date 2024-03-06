import { Outlet } from "react-router-dom"
// import * as LayoutCss from "./Layout.module.css"
import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import {Online, Offline } from "react-detect-offline";

export default function Layout() {
  return <>
  <Navbar/>
  <div className="min-vh-100 py-5">
  <Online>
  <Outlet/>
  </Online>
  <Offline>
  <div className="text-center text-white h1 bg-black py-5 min-vh-100 d-flex align-items-center"><p>You Are Offline Right Now , Please Checkout Your Network And Try Again ...</p></div>
  </Offline>
  </div>
  <Footer/>
  </>
}
