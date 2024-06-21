import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {formatNumber} from "../utils";

const Category = ({ category }) => {
    const navigate = useNavigate();
    const {t} = useTranslation()
    

    return (
        <div
            className="bg-white p-4 cursor-pointer md:hover:bg-gray-100 flex flex-col items-start gap-1 border rounded"
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
            {category.bestDeal && 
            <div className="text-sm text-gray-400">
                {t("bestDeal")} {formatNumber(category.bestDeal.pricePerUnit)} × {formatNumber(category.bestDeal.amount)} = {formatNumber(category.bestDeal.pricePerPackage)}
            </div>}
        </div>
    );
};

export default Category;
