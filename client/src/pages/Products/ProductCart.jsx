import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCart = ({p}) => {
    const dispatch = useDispatch()
    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    return <div className="relative max-w-sm bg-gray-100 rounded-lg shadow">
        <section className="relative">
            <HeartIcon product={p}/>
            <Link to={`/product/${p._id}`}>
                <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 mr-2 px-2 py-1 rounded-full">
                    {p?.brand}
                </span>

                <img src={p.image} alt={p.name} />
            </Link> 
        </section>

        <div className="p-5">
            <div className="flex justify-between">
                <h5 className="mb-2 text-xl ">{p?.name}</h5>
                <p className="font-semibold text-pink-500">
                    {p?.price?.toLocaleString("en-US", {style: "currency", currency: "USD"})}
                </p>
            </div>
            <p className="mb-3 font-normal text-[#cfcfcfc]">{p?.description?.substring(0, 60)}</p>
            <button className="p-2 rounded-full" onClick={() => addToCartHandler(p, 1)}>
                <AiOutlineShoppingCart size={25}/>
            </button>
        </div>
    </div>;
};

export default ProductCart;
