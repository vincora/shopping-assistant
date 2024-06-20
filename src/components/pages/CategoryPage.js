import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Item from "../Item";
import ItemForm from "../forms/ItemForm";
import ActionDeleteElement from "../ActionDeleteElement";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/itemsSlice";
import emptyCategory from "../../images/NoItemsCart.png";
import EmptyListPlaceholder from "../EmptyListPlaceholder";
import { formatNumber } from "../../utils";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../LanguageSwitch";
import copy from "copy-to-clipboard";
import { DiffIcon } from "@primer/octicons-react";
import { cn } from "../../utils";
import { selectCategoryWithPricePerUnit } from "../../store/selectors/selectCategoriesWithSortedItems";

const NOTIFICATION_VISIBLE = 1;
const NOTIFICATION_FADE_OUT = 2;
const NOTIFICATION_HIDDEN = 3;

const CategoryPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [showPriceDiff, setShowPriceDiff] = useState(false);
    const toggleShowDiff = () => {
        setShowPriceDiff((prev) => !prev);
    };

    const categoriesWithSortedItems = useSelector(
        selectCategoryWithPricePerUnit
    );

    const currentCategory = categoriesWithSortedItems.find(
        (element) => element.id === categoryId
    );
    const itemList = currentCategory?.items;

    const sortedItems = useMemo(
        () =>
            (itemList ?? []).map((item) => ({
                ...item,
                priceDiffWithTarget:
                    item.pricePerPackage - itemList[0].pricePerPackage,
            })),
        [itemList]
    );

    const categoryTitle = currentCategory?.category;

    const [notificationState, setNotificationState] = useState(3);
    const timeoutRef = useRef(null);

    const copyTextToClipboard = () => {
        copy(categoryTitle);
        setNotificationState(NOTIFICATION_VISIBLE);
        timeoutRef.current = setTimeout(() => {
            setNotificationState(NOTIFICATION_FADE_OUT);
        }, 1000);
    };

    useEffect(() => {
        if (!currentCategory) {
            navigate("/", { replace: true });
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentCategory, navigate, timeoutRef]);

    return (
        <div className="flex flex-col justify-center h-full relative">
            {notificationState !== NOTIFICATION_HIDDEN && (
                <div
                    className={cn(
                        "absolute top-7 p-2 z-20 w-full flex justify-center transition-opacity ease-in",
                        notificationState === NOTIFICATION_FADE_OUT
                            ? "opacity-0"
                            : ""
                    )}
                    onTransitionEnd={() => {
                        setNotificationState(NOTIFICATION_HIDDEN);
                    }}
                >
                    <div className="text-sm bg-gray-100 py-1 px-3 max-w-sm rounded">
                        {t("clipboard")}
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center mb-6 ">
                <button onClick={toggleShowDiff}>
                    <DiffIcon size={24} fill="#ccc" />
                </button>
                <h1
                    className="text-xl capitalize text-center text-primary font-medium break-words cursor-pointer"
                    onClick={copyTextToClipboard}
                >
                    {categoryTitle}
                </h1>
                <LanguageSwitch />
            </div>

            {itemList.length === 0 && (
                <EmptyListPlaceholder
                    img={emptyCategory}
                    title={t("emptyListTitle")}
                    i18nKey="emptyListDescription"
                />
            )}
            {itemList.length > 0 && (
                <div className="flex flex-col items-center grow overflow-auto space-y-3 transition-all">
                    {sortedItems.map((item, index) => {
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
                                <Item
                                    item={item}
                                    showPriceDiff={index !== 0 && showPriceDiff}
                                />
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
