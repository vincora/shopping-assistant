import React from "react";
import { useNavigate } from "react-router-dom";


const Category = ({ category }) => {

    const navigate = useNavigate();

    return (
        <div
            className=" bg-white cursor-pointer hover:bg-gray-100 flex justify-between items-center "
            onClick={() => {
                navigate(`category/${category.id}`);
            }}
        >
            <span className="p-3">{category.category}</span>

        </div>
    );
};

export default Category;
