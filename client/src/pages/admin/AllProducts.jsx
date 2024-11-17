import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import { useAllProductsQuery } from "../../redux/api/productApi";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
    const {data: products, isLoading, isError} = useAllProductsQuery()

    const renderAllProducts = products && products.map(product => 
        <Link key={product._id} to={`/admin/productupdate/${product._id}`} >
            <div className="flex border border-slate-400 p-1">
                <img src={product.image} alt={product.name} width={'200'}/>
                <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">{product?.name}</h5>
                        <p className="text-gray-400 text-sm">{moment(product.createdAt).format("MMM Do YYYY")}</p>
                    </div>
                    <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">{product?.description?.substring(0, 160)}</p>
                    <div className="flex justify-between">
                        <Link to={`/admin/productupdate/${product._id}`} className="bg-black rounded-sm text-white px-4 py-2 hover:bg-opacity-75">Update Product</Link>
                        <p>$ {product?.price}</p>
                    </div>
                </div>

            </div>
        </Link>)

    if(isLoading) {
        return <Loader/>
    }

    if(isError) {
        return <div>Error loading products</div>
    }

    return <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
            <div className="p-3">
                <div className="ml-[2rem] text-xl font-bold h-12">
                    All Products ({products.length})
                </div>

                <div className="">
                {renderAllProducts}
                </div>
            </div>
        </div>
    </div>;
};

export default AllProducts;
