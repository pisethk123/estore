import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useGetTopProductsQuery } from '../../redux/api/productApi'
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";


const ProductTabs = ({
    loadingProductReview,
    userInfo, 
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product}) => {
    const {data, isLoading} = useGetTopProductsQuery()
    const [activeTab, setActiveTab] = useState(1)

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

    if(isLoading) return <Loader/>

    return <div className="flex flex-col md:flex-row">
        <section className="mr-[5rem]">
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`} onClick={() => handleTabClick(2)}>All Reviews</div>
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`} onClick={() => handleTabClick(1)}>Write Your Review</div>
            <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ""}`} onClick={() => handleTabClick(3)}>related products</div>
        </section>

        <section>
            {activeTab === 1 && (
                <div className="mt-4">
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor="rating" className="block text-xl mb-2">Rating</label>

                                <select 
                                    id="rating" 
                                    required 
                                    value={rating} 
                                    onChange={e => setRating(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] ">
                                        <option value={""}>choose an option</option>
                                        <option value="1">Inferior</option>
                                        <option value="2">decent</option>
                                        <option value="3">great</option>
                                        <option value="4">excellent</option>
                                        <option value="5">exeptional</option>
                                </select>
                            </div>

                            <div className="my-2">
                                <label htmlFor="comment" className="block text-xl mb-2">Comment</label>

                                <textarea 
                                    id="comment"
                                    rows={'3'}
                                    required
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loadingProductReview}
                                className="bg-pink-600 text-white py-2 px-4 rounded-lg">Submit</button>
                        </form>
                    ): (
                        <p>please <Link to={'/login'}>sign in</Link> to write a review</p>
                    )}
                </div>
            )}
        </section>

        <section>
            {
                activeTab === 2 && <div>
                    {product.product.reviews.length === 0 && <p>no reviews</p>}
                    <div>
                        {
                            product.product.reviews.map(review => 
                            <div 
                                className="p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5" 
                                key={review._id}>
                                <div className="flex justify-between">
                                    <strong >{review.name}</strong>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                </div>
                                <p className="my-4">{review.comment}</p>
                                <Rating value={review.rating}/>
                            </div>)
                        }
                    </div>
                </div>
            }
        </section>

        <section>
            {
                activeTab === 3 && <section>
                    <section className="ml-[4rem] flex flex-wrap">
                        {
                            !data? <Loader/>
                            : data.products.map(product => <div key={product._id}>
                                <SmallProduct product={product}/>
                            </div>)
                        }
                    </section>
                </section>
            }
        </section>
    </div>;
};

export default ProductTabs;
