import { Helmet } from "react-helmet";
// import * as CartCss from "./Cart.module.css"
import React, { useEffect } from "react";
import { useContext } from "react";
import { cartAuthContext } from "../../Context/CartAuthProvider/CartAuthProvider";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import Reset from './../Reset/Reset';

export default function Cart() {
  useEffect(() => {
    
    <Helmet>
    <meta charSet="utf-8" />
    <title>Cart</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
  async function deleteAllProducts() {
    const result = deleteAllCartProduct();
    if (result) {
      toast.success("All Products Deleted...  ");
    } else {
      toast.error("Deletion error occured");
    }
  }

  const {
    updateCartProductQuantity,
    products,
    deleteCartProduct,
    numOfCartItems,
    deleteAllCartProduct,
    totalCartPrice,
  } = useContext(cartAuthContext);

  function increaseQuantity(productId, newCount) {
    const result = updateCartProductQuantity(productId, newCount);
    // console.log("cart result ", result);
    if (result) {
      toast.success("Product Increased");
    } else {
      toast.error("increasing error occured");
    }
  }

  function decreaseQuantity(productId, newCount) {
    const result = updateCartProductQuantity(productId, newCount);
    // console.log("cart result ", result);
    if (result) {
      toast.success("Product decreased");
    } else {
      toast.error("decreasing error occured");
    }
  }

  function deleteSelectedProduct(productId) {
    const result = deleteCartProduct(productId);
    // console.log("array after deletion", result);
    if (result) {
      toast.success("Product Deleted");
    } else {
      toast.error("Deletion error occured");
    }
  }



  if (products?.length === 0) {
    return (
      <div className="container py-5 my-5 fw-bolder bg-secondary-subtle">
        <h2>Shop Cart</h2>
        <h3>Your Cart Is Empty</h3>
      </div>
    );
  }
  if(!products){
    return <Loader/>
  }
  return (
    <>

        <div className="container py-5">
          <div className="d-flex align-items-center justify-content-between">
            <div className="leftSide">
              <h2 className="text-success">Shop Cart</h2>
              <h5 className="my-3">
                Total Cart Price :{" "}
                <span className="fw-bold">{totalCartPrice} LE</span>
              </h5>
            </div>
            <div className="rightSide">
              <Link to={`/checkOut`}>
                <button className="btn btn-outline-success">
                  Complete Payment
                </button>
              </Link>
              <p className="h5 fw-bold my-2">
                Total Cart Item: {numOfCartItems}
              </p>
            </div>
          </div>

              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="row py-3 my-3 g-4 align-items-center border-bottom border-black"
                  >
                    <div className="col-xl-1 col-md-3">
                      <figure>
                        <img
                          src={product.product.imageCover}
                          alt="product.imageCover"
                          className="w-100"
                        />
                      </figure>
                    </div>

                    <div className="col-xl-9 col-md-6">
                      <article>
                        <h3>title: {product.product.title}</h3>
                        <h5>price : {product.price}</h5>
                        <button
                          onClick={() =>
                            deleteSelectedProduct(product.product.id)
                          }
                          className="btn btn-outline-danger"
                        >
                          remove
                        </button>
                      </article>
                    </div>

                    <div className="col-xl-2 col-md-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() =>
                            increaseQuantity(
                              product.product.id,
                              (product.count += 1)
                            )
                          }
                          className="btn btn-outline-success"
                        >
                          +
                        </button>
                        <p>{product.count}</p>
                        <button
                          disabled={product.count === 1}
                          onClick={() =>
                            decreaseQuantity(
                              product.product.id,
                              (product.count -= 1)
                            )
                          }
                          className="btn btn-outline-success"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          <div className="deletion">
            <button
              onClick={() => deleteAllProducts()}
              className="btn d-block w-50 m-auto btn-outline-danger"
            >
              Clear All Products In Cart
            </button>
          </div>
        </div>
    </>
  );
}
