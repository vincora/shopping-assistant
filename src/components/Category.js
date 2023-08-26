import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../store/itemsSlice";

const Category = ({ category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div
            className=" bg-white p-4 cursor-pointer md:hover:bg-gray-100 flex justify-between items-center border rounded"
            onClick={() => {
                navigate(`category/${category.id}`);
            }}
        >
            <div className="">{category.category} <span className="text-sm text-gray-400">({category.items.length})</span></div>
            <button
                className="hidden md:block"
                onClick={() => {
                    if (
                        !window.confirm(
                            `Do you want to delete ${category.category} category?`
                        )
                    ) {
                        return false;
                    }
                    dispatch(deleteCategory(category.id));
                }}
            >
                <div className="icon-icon-delete text-gray-300 hover:text-gray-500"></div>
            </button>
        </div>
    );
};

export default Category;
