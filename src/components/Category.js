import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
    const navigate = useNavigate();

    return (
        <div
            className="group bg-white p-4 cursor-pointer md:hover:bg-gray-100 flex items-center border rounded"
            onClick={() => {
                navigate(`category/${category.id}`);
            }}
        >
            <div className="text-ellipsis overflow-hidden">
                {category.category}{" "}
                <span className="text-sm text-gray-400">
                    ({category.items.length})
                </span>
            </div>
        </div>
    );
};

export default Category;
