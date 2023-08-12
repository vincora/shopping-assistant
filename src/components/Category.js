import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../store/itemsSlice";

const Category = ({ category }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div
            className=" bg-white cursor-pointer p-2 hover:bg-gray-100 flex justify-between items-center "
            key={category.id}
            onClick={() => {
                navigate(`category/${category.id}`);
            }}
        >
            <span>{category.category}</span>
            <button
                className="icon-icon-delete text-gray-400 p-3"
                onClick={() => {
                    dispatch(deleteCategory(category.id));
                }}
            ></button>
        </div>
    );
};

export default Category;
