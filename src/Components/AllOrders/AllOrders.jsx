import axios from "axios";
import Loader from "./../Loader/Loader";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AllOrders() {
    useEffect(() => {
        <Helmet>
        <title>All Orders</title>
            </Helmet>
    },[])
    const ordersId = sessionStorage.getItem("ordersId");
async function getUserOrders() {
    return await axios
    .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ordersId}`)
}
// cache Data
const { data, isError, isLoading } = useQuery(`getOrders`, getUserOrders, {
    cacheTime: 60000,
});
// loading spinner
if (isLoading) {
    return <Loader />;
}
if (isError) {
    return (
    <>
        <div className="d-flex justify-content-center align-content-center fw-bolder">
        <h3 className="h1">{"loading error, try later or buy new items..."}</h3>
        </div>
    </>
    );
    }

    const orders = data?.data;
    // console.log(orders);
return (
    <>

        <div className="container text-center py-5">
            <h2 >All Orders</h2>
            <div  className="row g-4">
            {orders.map((order, index) => (
                // console.log(order),
                    <div key={index} className="col-md-6 ">
                        <div className="order bordser border-3">
                            <h5 className="fw-bold bg-secondary text-white">Cart Items  </h5>
                            <div  className="row py-2 g-4 justify-content-center">
                                {order.cartItems.map((item, idx) => (
                                    // console.log("item",item),
                                    
                                    <div key={idx}  className="col-xl-4 col-md-6 col-sm-6">
                                        <Link  to={`/productDetails/${item.product.id}`}>
                                            <div className="item  border border-3 rounded rounded-3 h-100">
                                                <img src={item.product.imageCover} alt={item.product.title} className="w-100" />
                                                <div className="d-flex justify-content-between">
                                                <h5>count :<span className="fw-bold"> { item.count}</span></h5>
                                                <h5>price :<span className="fw-bold"> { item.price}</span></h5>
                                                </div>
                                                <h5 className="h6">Name :<span className="fw-bold h6" > { item.product.title}</span></h5>
                                    </div></Link>
                                        </div>
                            ))}
                            </div>
                            <div className="d-flex justify-content-around my-2">
                            <h6>is Delivered : <span className="fw-bold"> {`${order.isDelivered}` }</span></h6>
                                <h6>Payment Type : <span className="fw-bold">{order.paymentMethodType} </span></h6>
                            </div>
                            <p> <span className="fw-bold">Order Details : </span> name : <span className="fw-bold">{order.user.name}</span> , Phone Number : <span className="fw-bold">{ order.user.phone}</span> </p>
                            <h4 className="bg-primary-subtle">Total Order Price : <span className="fw-bold">{ order.totalOrderPrice}</span></h4>
                    </div>
            </div> ))}
                </div>
    </div>
    </>
);
}
