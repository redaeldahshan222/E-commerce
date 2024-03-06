import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { cartAuthContext } from "../../Context/CartAuthProvider/CartAuthProvider";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
export default function WishList() {
  useEffect(() => {
    
    <Helmet>
    <meta charSet="utf-8" />
    <title>WishList</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
  </Helmet>
  },[])
  const {
    addToCart,
    wishListItems,
    removeProductFromWishlist,
    getLoggedUserWishlist,
  } = useContext(cartAuthContext);

  async function getWishListData() {
    return await getLoggedUserWishlist();
  }
  // cache Data
  const {  isError, isLoading, error } = useQuery(
    `getWishList`,
    getWishListData,
    {
      cacheTime: 60000,
    }
  );
  // loading spinner
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <>
        <div className="d-flex justify-content-center align-content-center fw-bolder">
          <h3 className="h1">error{error}</h3>
        </div>
      </>
    );
  }
  let item = wishListItems;

  async function addMyProduct(productId) {
    const result = await addToCart(productId);
    if (result) {
      toast.success("Product Added Successfully", { position: "top-center" });
    } else {
      toast.error("SomeThing Went Wrong.....", { position: "top-center" });
    }
  }

  function deleteSelectedProduct(productId) {
    const result = removeProductFromWishlist(productId);
    // console.log("array after deletion",result);
    if (result) {
      toast.success("Product Deleted");
    } else {
      toast.error("Deletion error occured");
    }
  }

  if (!item) {
    return <Loader />;
  }

  if (item.length === 0) {
    return (
      <div className="container py-5 my-5 fw-bolder bg-secondary-subtle">
        <h2>Wish List</h2>
        <h3>WishList Is Empty</h3>
      </div>
    );
  }

  return (
    <>

        <div className="container py-5">
              <h2 className="text-success text-center">WishList Cart</h2>

          {item?.map((product, index) => {
            //!......//
            // كمل من هنا......
            // console.log("productssssss", product);
            // console.log("productid",product.id);
            return (
              <div
                key={index}
                className="row py-3 my-3 g-4 align-items-center border-bottom border-black"
              >
                <div className="col-xl-1 col-md-3">
                  <figure>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />
                  </figure>
                </div>

                <div className="col-xl-9 col-md-6 position-relative">
                  <article>
                    {product.priceAfterDiscount ? (
                      <div className="sale">Sale</div>
                    ) : (
                      ""
                    )}
                    <h3>title: {product.title}</h3>
                    <div className="d-flex justify-content-between">
                      <div className="left">
                        {product.priceAfterDiscount ? (
                          <p>
                            Price :
                            <span className="text-decoration-line-through">
                              {product.price}
                            </span>
                            /{product.priceAfterDiscount} Egp
                          </p>
                        ) : (
                          <p> Price : {product.price} Egp</p>
                        )}
                        <button
                          onClick={() => deleteSelectedProduct(product._id)}
                          className="btn btn-outline-danger"
                        >
                          remove
                        </button>
                      </div>
                      <div className="right">
                        <h5>
                          Category :{" "}
                          <div
                            style={{ width: "30px ", display: "inline-block" }}
                          >
                            <img
                              src={product.category.image}
                              alt={product.category.name}
                              className="w-100"
                            />
                          </div>{" "}
                          <span className="fw-bold h6">
                            {product.category.name}
                          </span>
                        </h5>
                        <h5>
                          brand :{" "}
                          <div
                            style={{ width: "50px ", display: "inline-block" }}
                          >
                            <img
                              src={product.brand.image}
                              alt={product.brand.name}
                              className="w-100"
                            />
                          </div>{" "}
                          <span className="fw-bold h6">
                            {product.brand.name}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-xl-2 col-md-3">
                  <div className="add">
                    <button
                      onClick={function () {
                        addMyProduct(product.id);
                      }}
                      className="btn btn-outline-success"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </>
  );
}
