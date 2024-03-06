// import * as NotFoundCss from "./NotFound.module.css"
import React, { useEffect } from 'react'
import notFoundImg from "../../Assets/Images/error.svg"
import { Helmet } from 'react-helmet'
export default function NotFound() {
  useEffect(() => {
    
    <Helmet>
    <meta charSet="utf-8" />
    <title>Not Found</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
  return<>
  <div className="notFound">
    <img className='w-75 mx-auto d-block' src={notFoundImg} alt="Not Found" />
    </div>
  </>
}