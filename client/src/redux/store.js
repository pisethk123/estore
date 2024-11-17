import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice';
import favoritesReducer from '../redux/features/favorites/favoriteSlice'
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import cartSlice from '../redux/features/cart/cartSlice'
import shopSlice from "../redux/features/shop/shopSlice";

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSlice,
        shop: shopSlice
    },

    preloadedState: {
        favorites: initialFavorites
    },
    
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store