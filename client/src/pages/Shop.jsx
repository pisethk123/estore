import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from  '../redux/api/productApi'
import { setCategories, setProducts, setChecked } from '../redux/features/shop/shopSlice'
import Loader from "../components/Loader";
import { useGetAllCategoryQuery } from '../redux/api/categoryApi'
import ProductCart from "./Products/ProductCart";

const Shop = () => {
    const dispatch = useDispatch()
    const { categories, products, checked, radio } = useSelector((state) => state.shop)

    const categoriesQuery = useGetAllCategoryQuery()
    const [priceFilter, setPriceFilter] = useState('')

    const filteredProductQuery = useGetFilteredProductsQuery({checked, radio})

    useEffect(() => {
        if(categoriesQuery.data) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
        if(!checked.length || !radio.length) {
            if(filteredProductQuery.data) {
                const filteredProducts = filteredProductQuery.data.filter((product) => {
                    return (product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10))
                })
                dispatch(setProducts(filteredProducts))
            }
        }
    }, [checked, radio, filteredProductQuery.data, dispatch, priceFilter])
    
    const brandClickHandler = (brand) => {
        const productsByBrand = filteredProductQuery.data?.filter((product) => product.brand === brand)
    }

    const checkHandler = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    const uniqueBrands = [...Array.from(new Set(filteredProductQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined)))]
    
    const priceChangeHandler = e => {
        setPriceFilter(e.target.value)
    }

    return <div>
        <div className="container mx-auto">
            <div className="flex md:flex-row">
                <div className="p-3 mt-2 mb-2 bg-gray-100">

                    <h2 className="h4 text-center py-2 bg-black text-white rounded-full">Filter by Check</h2>
                    <div className="p-5 w-[15rem]">
                        {categories?.map((c) => (
                            <div className="mb-2" key={c._id}>
                                <div className="flex items-center mr-4">
                                    <input type="checkbox" id="red-checkbox" onChange={(e) => checkHandler(e.target.checked, c._id)}/>
                                    <label htmlFor="pink-checkbox" className="ml-2 text-sm font-meduim">{c.name}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="h4 text-center bg-black text-white py-2 rounded-full">Filter by Brands</h2>
                    <div className="p-5">
                        {uniqueBrands?.map((brand) => 
                            <div className="flex items-center mr-4 mb-5" key={brand}>
                                <input type="radio" name="brand" id={brand} onChange={() => brandClickHandler(brand)}/>
                                <label htmlFor="pink-radio" className="ml-2 text-sm font-meduim">{brand}</label>
                            </div>
                        )}
                    </div>

                    <h2 className="h4 text-center bg-black text-white py-2 rounded-full">Filter by Price</h2>
                    <div className="p-5 w-[15rem]">
                        <input type="text" placeholder="Enter Price" value={priceFilter} onChange={priceChangeHandler} className="w-full px-3 py-2"/>
                    </div>

                    <div className="p-5 pt-0">
                        <button className="w-full border my-4" onClick={() => window.location.reload()}>Reset</button>
                    </div>
                </div>

                <div className="p-3">
                    <h2 className="h2 text-center mb-2">{products?.length} Products</h2>
                    <div className="flex flex-wrap">
                        {products.length === 0? (
                            <Loader/>
                        ) : (
                            products?.map((p) => (
                                <div className="p-3" key={p._id}> 
                                    <ProductCart p={p}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Shop;
