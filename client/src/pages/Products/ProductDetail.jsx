import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation} from '../../redux/api/productApi'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaClone, FaShoePrints, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetail = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ qty, setQty ] = useState(1)
    const [ rating, setRating ] = useState(0)
    const [ comment, setComment ] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    
    const { userInfo } = useSelector(state => state.auth)

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

    const addToCartHandler = () => {
        dispatch(addToCart({...product.product, qty}))
    }

    const submitHandler = async(e) => {
        e.preventDefault()

        try {
            await createReview({ productId, rating, comment}).unwrap()
            refetch()
            toast.success("review created successfully")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

   

  return <>
    <div>
        <Link to="/" className="font-semibold hover:underline ml-[10rem]">Go back</Link>
    </div>

    {isLoading? <Loader/> : 
    error? <Message variant={'danger'}>{error?.data?.message || error.message}</Message>: 
    <>
        <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
                <img src={product.product.image} alt={product.product.name} className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"/>
                <HeartIcon product={product.product}/>
            </div>
            <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.product.name}</h2>
                <p className="my-4 xl:w-[35rem] md:w-[30rem] text-[#b0b0b0]">{product.product.description}</p>
                <p className="text-5xl my-4 font-extrabold">$ {product.product.price}</p>

                <div className="flex items-center justify-between w-[20rem]">
                    <div className="one">
                        <h1 className="flex items-center mb-6">
                            <FaStore className="mr-2"/> Brand: {product.product.brand}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaClock className="mr-2"/> Added: {moment(product.product.createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaStar className="mr-2"/> Reviews: {product.product.numReviews}
                        </h1>
                    </div>

                    <div className="two">
                        <h1 className="flex items-center mb-6">
                            <FaStar className="mr-2"/> Ratings: {rating}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaShoePrints className="mr-2"/> Quantity: {product.product.quantity}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaBox className="mr-2"/> In Stock: {product.product.countInStock}
                        </h1>
                    </div>
                </div>

                <div className="flex justify-between flex-wrap">
                    <Rating value={product.product.reviews.length} text={`${product.product.numReviews} reviews`}/>

                    {product.product.countInStock > 0 && (<div>
                        <select value={qty} onChange={e => setQty(e.target.value)} className="p-2 w-[6rem] rounded-lg text-black">
                            {[...Array(product.product.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>)}
                </div>
                
                <div className="btn-container">
                    <button onClick={addToCartHandler} disabled={product.product.countInStock === 0} className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">
                        Add To Cart
                    </button>
                </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                <ProductTabs 
                    loadingProductReview={loadingProductReview} 
                    userInfo={userInfo} 
                    submitHandler={submitHandler} 
                    rating={rating} 
                    setRating={setRating} 
                    comment={comment} 
                    setComment={setComment} 
                    product={product}/>
            </div>
        </div>
    </>}
  </>;
};

export default ProductDetail;
