import axios from "axios";
import ProductsCss from "./Products.module.css";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { cartAuthContext } from "../../Context/CartAuthProvider/CartAuthProvider";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
export default function Products() {
  useEffect(() => {
    
    <Helmet>
    <meta charSet="utf-8" />
    <title>Products</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
  const { addToCart, addProductToWishlist } = useContext(cartAuthContext);
  
  async function addMyProduct(productId){
    const result = await addToCart(productId)
    if(result){
      toast.success("Product Added Successfully",{position:"top-center"})
    }else{
      toast.error("SomeThing Went Wrong.....",{position:"top-center"})
    }
  }

async function addToWishList(productId){
      const result = await addProductToWishlist(productId)
      if(result){
        toast.success("Product Saved To WishList Successfully",{position:"top-center"})
      }else{
        toast.error("SomeThing Went Wrong.....",{position:"top-center"})
      }
}

  // cache Data
  const { data, isError, isLoading } = useQuery(`getproduct`, getAllProduct, {
    cacheTime: 60000,
  });
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
  const product = data?.data.data;
  // console.log(product);
  async function getAllProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  return (
    <>
      <div className="container py-5">
        <div className="row g-4">
          {product.map((product, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="product position-relative">
                <Link to={`/productDetails/${product.id}`}>
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  {product.priceAfterDiscount ? (
                    <div className={ProductsCss.sale}>Sale</div>
                  ) : (
                    ""
                  )}
                  <h3 className="h6 text-success fw-bold">
                    {product.category.name}
                  </h3>
                  <h2 className="h5 fw-bold text-center">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h2>
                  <div className="d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                      <p>
                        <span className="text-decoration-line-through">
                          {product.price}
                        </span>
                        /{product.priceAfterDiscount} Egp
                      </p>
                    ) : (
                      <p>{product.price} Egp</p>
                    )}
                    <p>
                      <span className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </span>
                      {product.ratingsAverage}
                    </p>
                  </div>
                  {/* <h5>id:{product.id}</h5> */}
                  {/* <h6>remains:{product.quantity}</h6> */}
                </Link>
                <div className="d-flex justify-content-between fa-2x">
                  <button
                    onClick={function () {
                      addMyProduct(product.id)
                    }}
                    className="btn btn-success"
                  >
                    Add To Cart
                  </button>
                  <div
                  onClick={()=>addToWishList(product.id)}
                    role="button"
                  >
                    <i className="fa-solid fa-heart"></i>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
