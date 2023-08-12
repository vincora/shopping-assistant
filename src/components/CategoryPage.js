import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteItem } from "../store/itemsSlice";
import Button from "./Button";
import BackBtn from "./BackBtn";
import Item from "./Item";

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
        <div>
            <h1 className="text-xl capitalize text-center font-medium mb-4">
                {currentCategory?.category}
            </h1>
            <div className="flex flex-col gap-3">
                {sortedItems.map((item) => {
                    return (
                        <Item item={item}/>
                    );
                })}
                <div className="flex gap-2 absolute bottom-5 left-5 right-5 max-w-sm mx-auto">
                    <BackBtn
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Back
                    </BackBtn>
                    <Button
                        onClick={() =>
                            navigate(`/category/${categoryId}/itemForm`)
                        }
                    >
                        Add new item
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
