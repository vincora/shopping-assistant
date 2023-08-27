import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import ItemForm from "./ItemForm";
import ActionElement from "./ActionElement";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/itemsSlice";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.goods.categories);
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
        <div className="flex flex-col h-full">
            <h1 className="text-xl capitalize text-center font-medium mb-4">
                {currentCategory?.category}
            </h1>
            <div className="grow overflow-auto space-y-3 transition-all">
                {sortedItems.map((item) => {
                    const handleDelete = () => {
                        dispatch(deleteItem({ categoryId, item }));
                    };
                    return (
                        <ActionElement
                            key={item.id}
                            onAction={handleDelete}
                        >
                            <Item item={item} />
                        </ActionElement>
                    );
                })}
            </div>

            <ItemForm />
        </div>
    );
};

export default CategoryPage;
