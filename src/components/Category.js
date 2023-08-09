import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem } from "../store/itemsSlice";

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
        <div className="">
            <h1>{currentCategory?.category}</h1>
            {sortedItems.map((item) => {
                return (
                    <div className="text-3xl" key={item.id}>
                        <div>Amount in units (kg/l/piece): {item.amount}</div>
                        <div>Price per item: {item.pricePerItem}</div>
                        <div>Price per unit: {item.pricePerUnit}</div>
                        {item.notes && <div>Notes: {item.notes}</div>}
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
            <div>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    back
                </button>
                <button
                    onClick={() => navigate(`/category/${categoryId}/itemForm`)}
                >
                    add new item
                </button>
            </div>
        </div>
    );
};

export default Category;
