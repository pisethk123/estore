import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return <>
    <button 
        className={`${isMenuOpen? "top-2 right-2" : "top-5 right-7"} p-2 fixed rounded-lg text-black`}
        onClick={toggleMenu}>
        {
            isMenuOpen? <FaTimes/> : (<>
                <div className="w-6 h-0.5 bg-white-my-1">gfgf</div>
                <div className="w-6 h-0.5 bg-white-my-1">fgf</div>
                <div className="w-6 h-0.5 bg-white-my-1">gfg</div>
            </>)
        }
    </button>
    {
        isMenuOpen && <section className="bg-[#151515] p-4 fixed right-7 top-5">
            <ul className="list-none mt-2">
                <li>
                    <NavLink 
                        className={"list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"}
                        to={"/admin/dashboard"}
                        style={({isActive}) => ({color: isActive? "greenyellow": "white"})}>
                            Admin Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={"list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"}
                        to={"/admin/categorylist"}
                        style={({isActive}) => ({color: isActive? "greenyellow": "white"})}>
                            Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={"list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"}
                        to={"/admin/productlist"}
                        style={({isActive}) => ({color: isActive? "greenyellow": "white"})}>
                            Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={"list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"}
                        to={"/admin/allproduct"}
                        style={({isActive}) => ({color: isActive? "greenyellow": "white"})}>
                            All Products
                    </NavLink>
                </li>
            </ul>
        </section>
    }
  </>; 
};

export default AdminMenu;
