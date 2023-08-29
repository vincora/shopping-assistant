import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import ActionDeleteElement from "./ActionDeleteElement";
import { deleteCategory } from "../store/itemsSlice";
import { useDispatch } from "react-redux";

const FirstPage = () => {
    const categories = useSelector((state) => state.goods.categories);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-medium text-center mb-4">
                Shopping assistant
            </h1>
            {categories.length === 0 ? (
                <div className="grow flex flex-col gap-3 justify-end items-center p-3 text-center">
                    <div>Add a category of goods <br /> (tomatoes, rice, milk etc.)</div>
                    <div className="icon-arrow-down"></div>
                </div>
            ) : (
                <div className="grow overflow-y-scroll flex flex-col items-center gap-3 ">
                    {categories.map((category) => {
                        const onCategoryDelete = () => {
                            if (
                                !window.confirm(
                                    `Do you want to delete ${category.category} category?`
                                )
                            ) {
                                return false;
                            }
                            dispatch(deleteCategory(category.id));
                        };
                        return (
                            <ActionDeleteElement
                                key={category.id}
                                onAction={onCategoryDelete}
                            >
                                <Category category={category} />
                            </ActionDeleteElement>
                        );
                    })}
                </div>
            )}
            <div>
                <CategoryForm />
            </div>
        </div>
    );
};

export default FirstPage;
