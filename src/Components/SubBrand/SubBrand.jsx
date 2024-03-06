import axios from 'axios';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function SubBrand() {
  useEffect(() => {
    
    <Helmet>
    <meta charSet="utf-8" />
  {/* <title>{brandData[0].brand.name}</title> */}
</Helmet>
  },[])
  const { id } = useParams();

  async function displaySubBrand() {
    // return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?`, {
      params: {
      brand:id
    }})
  }
  
  const{data,isError,isLoading}= useQuery(`subBrand/${id}`,displaySubBrand)

      // loading spinner
      if (isLoading) {
        return <Loader/>
      }
      if (isError) {
        return (
          <>
            <div className="d-flex justify-content-center align-content-center fw-bolder">
              <h3 className="h1">{"error"}</h3>
            </div>
          </>
        );
      }
const brandData=data?.data.data
  return <>
    <div className="text-center text-success w-50  container py-5">
      <div className="row g-4">
        {brandData.map((brand, index) => (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6">
          <div className="product position-relative">
            <Link to={`/productDetails/${brand.id}`}>
              <img
                className="w-100"
                src={brand.imageCover}
                alt={brand.title}
              />
              {brand.priceAfterDiscount ? (
                <div className="sale">Sale</div>
              ) : (
                ""
              )}
              <h3 className="h6 text-success fw-bold">
                {brand.category.name}
              </h3>
              <h2 className="h5 fw-bold text-center">
                {brand.title.split(" ").splice(0, 2).join(" ")}
              </h2>
              <div className="d-flex justify-content-between">
                {brand.priceAfterDiscount ? (
                  <p>
                    <span className="text-decoration-line-through">
                      {brand.price}
                    </span>
                    /{brand.priceAfterDiscount} Egp
                  </p>
                ) : (
                  <p>{brand.price} Egp</p>
                )}
                <p>
                  <span className="text-warning">
                    <i className="fa-solid fa-star"></i>
                  </span>
                  {brand.ratingsAverage}
                </p>
              </div>
            </Link>
          </div>
        </div>  
    ))}
  </div>
  </div>
  </>
}
