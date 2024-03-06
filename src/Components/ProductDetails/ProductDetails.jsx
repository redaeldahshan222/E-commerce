import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import deatilsCss from "../Products/Products.module.css"
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { cartAuthContext } from '../../Context/CartAuthProvider/CartAuthProvider';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
export default function ProductDetails() {
    useEffect(() => {
        
    <Helmet>
    <meta charSet="utf-8" />
    <title> {details.title} Product</title>
    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
</Helmet>
    },[])
    const { addToCart } = useContext(cartAuthContext);
    
    async function addMyProduct(productId){
    const result = await addToCart(productId)
    if(result){
        toast.success("Product Added Successfully",{position:"top-center"})
    }else{
        toast.error("SomeThing Went Wrong.....",{position:"top-center"})
    }
    }
    const {id} = useParams();
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    const {isLoading,data} =useQuery(`getProductDetails-${id}`,getProductDetails);
    
// loading spinner
if (isLoading) {
return <Loader/>
}
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed:2000,
    slidesToShow: 1,
    slidesToScroll: 1
};
    const details=data?.data.data;
return <>
    <div className="container position-relative py-5">
        <Link to="/products"><span role='button' className="text-white back border rounded bg-success bg-opacity-75 ms-3 mb-1 p-1 d-inline-block">
        <i className="fa-solid fa-arrow-left fa-2x"></i>
        </span></Link>
        <div className="row align-items-center">
            <div className="col-lg-3 col-md-6">
                <figure>
                    
            <Slider {...settings}>
                {details.images.map((img,index)=>
                <div key={index}>
            <img className='w-100' src={img} alt={details.title} />
                </div>
                )}
            </Slider>
                </figure>
            </div>
            <div className="col-lg-9 col-md-6">
            <article>
                <h3 className='text-main'>{details.subcategory[0].name}</h3>
                <h2>{details.title}</h2>
                <p>{details.description}</p>
            </article>
            
            {details.priceAfterDiscount ? (
                    <div className={`${deatilsCss.sale} mt-5`}>Sale</div>
                ) : (
                    ""
                )}
                
                <div className="d-flex justify-content-between">
                    {details.priceAfterDiscount ? (
                    <p>
                        <span className="text-decoration-line-through">
                        {details.price}
                        </span>
                        /{details.priceAfterDiscount} Egp
                    </p>
                    ) : (
                    <p>{details.price} Egp</p>
                    )}
                    <p>
                    <span className="text-warning">
                        <i className="fa-solid fa-star"></i>
                    </span>
                    {details.ratingsAverage}
                    </p>
                </div>
                    <div className="d-flex justify-content-between fa-2x">
                    <button
                    className='btn btn-success w-75 mx-auto'
                        onClick={function () {
                            addMyProduct(details.id);
                        }}
                    >
                        Add To Cart
                    </button>
                    <div onClick={function(){
                    }} role="button" >
                    <i className="fa-solid fa-heart"></i>
                    </div>
                </div>
            </div>
        </div>
        </div>
</>
}
