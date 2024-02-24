import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import ItemForm from "./ItemForm";
import ActionDeleteElement from "./ActionDeleteElement";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/itemsSlice";
import emptyCategory from "../images/NoItemsCart.png";
import EmptyListPlaceholder from "./EmptyListPlaceholder";

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
            <h1 className="text-xl capitalize text-center text-primary font-medium mb-6 break-words">
                {currentCategory?.category}
            </h1>
            {itemList.length === 0 && (
                <EmptyListPlaceholder
                    img={emptyCategory}
                    title="No items in this category yet"
                    description={<>Add items to compare them <br/> by price per unit (kg,l etc.)</>}
                />
            )}
            {itemList.length > 0 && (
                <div className="flex flex-col items-center grow overflow-auto space-y-3 transition-all">
                    {sortedItems.map((item) => {
                        const handleDelete = () => {
                            if (
                                !window.confirm(
                                    "Do you want to delete this item?"
                                )
                            ) {
                                return false;
                            }
                            dispatch(deleteItem({ categoryId, item }));
                        };
                        return (
                            <ActionDeleteElement
                                key={item.id}
                                onAction={handleDelete}
                            >
                                <Item item={item} />
                            </ActionDeleteElement>
                        );
                    })}
                </div>
            )}

            <ItemForm />
        </div>
    );
};

export default CategoryPage;
