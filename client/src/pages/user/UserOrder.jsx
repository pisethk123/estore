import React from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
    const {data, isLoading, error} = useGetMyOrdersQuery()
    console.log(data)
    
  return <div className="container mx-auto">
    <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
    {isLoading? <Loader/> : error? <Message variant={'danger'}>{error?.data?.error || error.error}</Message>: (
        <table>
            <thead>
                <tr>
                    <td className="py-2">Image</td>
                    <td className="py-2">Id</td>
                    <td className="py-2">Date</td>
                    <td className="py-2">Total</td>
                    <td className="py-2">Paid</td>
                    <td className="py-2">Delivered</td>
                    <td className="py-2"></td>
                </tr>
            </thead>
            
            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <img src={order.orderItems[0].image} alt={order.user} />
                    </tr>
                ))}
            </tbody>
        </table>
    )}
  </div>;
};

export default UserOrder;
