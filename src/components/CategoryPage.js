import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem } from "../store/itemsSlice";
import Button from "./Button";
import BackBtn from "./BackBtn";

const CategoryPage = () => {
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
                    <div className="border p-3 space-y-2">
                        <div className="grid grid-cols-[2fr_1fr]" key={item.id}>
                            <div>Amount in units (kg/l/piece):</div>
                            <div className="text-right">{item.amount}</div>
                            <div>Price per item:</div>
                            <div className="text-right">
                                {item.pricePerItem}
                            </div>
                            <div>Price per unit:</div>
                            <div className="text-right">
                                {item.pricePerUnit}
                            </div>
                            {item.notes && <div>Notes: {item.notes}</div>}
                        </div>
                        {/* <div className="w-full text-right">
                            <Button
                                onClick={() =>
                                    dispatch(deleteItem({ categoryId, item }))
                                }
                                remove
                            >
                                <div className="icon-icon-delete"></div>
                            </Button>
                        </div> */}
                    </div>
                );
            })}
            <div className="flex gap-2 fixed bottom-5 left-0 right-0 max-w-sm mx-auto">
                <BackBtn
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Back
                </BackBtn>
                <Button
                    onClick={() => navigate(`/category/${categoryId}/itemForm`)}
                >
                    Add new item
                </Button>
            </div>
        </div>
    );
};

export default CategoryPage;
