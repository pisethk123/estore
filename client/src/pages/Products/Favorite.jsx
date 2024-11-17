import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice'
import Product from "./Product";

const Favorite = () => {
    const favorites =  useSelector(selectFavoriteProduct)
  return <div className="ml-[10rem]">
    <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">Favorite Products</h1>

    <div className="flex flex-wrap">
        {favorites.map((product) => 
        <Product key={product._id} product={product}/>)}
    </div>
  </div>;
};

export default Favorite;
