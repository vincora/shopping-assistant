import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem } from "../store/itemsSlice";
import Button from "./Button";

const Category = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.items.categories);
    const currentCategory = categories.find(
        (element) => element.id === categoryId
    );
    const itemList = currentCategory?.items;

    const sortedItems = useMemo(
        () =>
            (itemList ?? [])
                .map((item) => ({
                    ...item,
                    pricePerUnit: (item.pricePerItem / item.amount).toFixed(2),
                }))
                .sort((a, b) => a.pricePerUnit - b.pricePerUnit),
        [itemList]
    );

    useEffect(() => {
        if (!currentCategory) {
            navigate("/", { replace: true });
        }
    }, [currentCategory, navigate]);

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-xl capitalize">{currentCategory?.category}</h1>
            {sortedItems.map((item) => {
                return (
                    <div>
                        <div className="border p-3 grid grid-cols-[2fr_1fr]" key={item.id}>
                            <div>Amount in units (kg/l/piece):</div>
                            <div className="text-right">{item.amount}</div>
                            <div>Price per item:</div>
                            <div className="text-right">{item.pricePerItem}</div>
                            <div>Price per unit:</div>
                            <div className="text-right">{item.pricePerUnit}</div>
                            {item.notes && <div>Notes: {item.notes}</div>}
                        </div>
                        <button
                            onClick={() =>
                                dispatch(deleteItem({ categoryId, item }))
                            }
                        >
                            delete item
                        </button>
                    </div>
                );
            })}
            <div className="flex gap-1">
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    back
                </Button>
                <Button
                    onClick={() => navigate(`/category/${categoryId}/itemForm`)}
                >
                    add new item
                </Button>
            </div>
        </div>
    );
};

export default Category;
