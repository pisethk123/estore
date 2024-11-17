import React, { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { 
    addToFavorites,
    removeFromFavorites,
    setFavorites
} from '../../redux/features/favorites/favoriteSlice'

import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage
} from '../../utils/localStorage'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id === product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    }, [])

    const toggleFavorite = () => {
        if(isFavorite) {
            dispatch(removeFromFavorites(product))
            removeFavoriteFromLocalStorage(product._id)
        } else {
            dispatch(addToFavorites(product))
            addFavoriteToLocalStorage(product)
        }
    }

    return <div onClick={toggleFavorite} className="absolute top-2 right-5 cursor-pointer">
        {
            isFavorite? 
            <FaHeart className="text-pink-500"/> 
            : <FaRegHeart className="text-pink-500"/>
        }
    </div>;
};

export default HeartIcon;
