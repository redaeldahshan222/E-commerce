// import * as BrandsCss from "./Brands.module.css"
import React, { useEffect } from 'react'
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Brands() {
  useEffect(() => {
    <Helmet >
    <meta charSet="utf-8" />
    <title>Brands</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
    // cache Data
    const { data, isError, isLoading, error } = useQuery(
      "getAllBrands",
      getAllBrands,
      { cacheTime: 60000 }
    );
    // loading spinner
    if (isLoading) {
      return <Loader/>
    }
    if (isError) {
      return (
        <>
          <div className="d-flex justify-content-center align-content-center fw-bolder">
            <h3 className="h1">{error}</h3>
          </div>
        </>
      );
    }
    const brand = data?.data.data;
  
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  return <>
  <div className="container py-5">
    <div className="row g-4">
      
    {brand.map((brand,index)=>
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="brand position-relative border border-3">
                <Link to={`/subBrand/${brand._id}`}>
                  <img
                    className="w-100 "
                    style={{height:"200px",
                          }}
                    src={brand.image}
                    alt={brand.name}
                  />
                  <h3 className="text-success fw-bold py-3 text-center">
                    {brand.name}
                  </h3>
                </Link>
              </div>
            </div>        
      )}
    </div>
  </div>
  </>
}
