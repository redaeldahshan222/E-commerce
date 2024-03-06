
import axios from "axios"
// import CategoriesCss from "./Categories.module.css"
import React, { useEffect } from 'react'
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
export default function Categories() {
  useEffect(() => {
    <Helmet>
    <meta charSet="utf-8" />
    <title>Categories</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
    // cache Data
    const { data, isError, isLoading, error } = useQuery(
      "getAllCategories",
      getAllCategories,
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
    const category = data?.data.data;
  // console.log(category);
  async function getAllCategories(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  return <>
  <div className="container py-5">
    <div className="row g-4">
      {category.map((category,index)=>
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="category position-relative border border-3">
                <Link to={`/subcategories/${category._id}`}>
                  <img
                    className="w-100 "
                    style={{height:"200px",
                          }}
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="text-success fw-bold py-3 text-center">
                    {category.name}
                  </h3>
                </Link>
              </div>
            </div>        
      )}
    </div>
    </div>
  </>
}
