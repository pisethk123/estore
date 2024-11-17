import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApi";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery()
    console.log(products)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }
  return <div className="mb-4 xl:block lg:block md:block">
    {isLoading? null: error?  <Message variant={'danger'}>
        {error?.data?.message || error.message}
    </Message>: 
    <Slider {...settings} className="xl:w-[56rem] sm:w-[40rem] sm:block">
        {products?.products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) =>
            <div  key={_id}>
                <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]"/>
                <div className="w-[20rem]">
                    <h2>{name}</h2>
                    <p>$ {price}</p>
                    <p>{description.substring(0, 170)}</p>...
                    <h1>Brand: {brand}</h1>
                    <h1>Added: {moment(createdAt).fromNow()}</h1>
                    <h1>Reviews: {numReviews}</h1>
                    <h1>Ratings: {rating}</h1>
                    <h1>In Stock: {countInStock}</h1>
                    <h1>Quantity: {quantity}</h1>
                </div>

            </div>
        )}
    </Slider>}
  </div>;
};

export default ProductCarousel;
