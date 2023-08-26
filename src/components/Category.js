import React from "react";
import { useNavigate } from "react-router-dom";


const Category = ({ category }) => {

    const navigate = useNavigate();

    return (
        <div
            className=" bg-white p-4 cursor-pointer md:hover:bg-gray-100 flex justify-between items-center border rounded"
            onClick={() => {
                navigate(`category/${category.id}`);
            }}
        >
            <div className="">{category.category}</div>
            <div className="text-xs">{category.items.length}</div>
        </div>
    );
};

export default Category;
