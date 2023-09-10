import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import ActionDeleteElement from "./ActionDeleteElement";
import { deleteCategory } from "../store/itemsSlice";
import { useDispatch } from "react-redux";
import emptyList from "../images/EmptyInbox.png";
import EmptyListPlaceholder from "./EmptyListPlaceholder";

const FirstPage = () => {
    const categories = useSelector((state) => state.goods.categories);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-medium text-center text-primary mb-6">
                Shopping assistant
            </h1>
            {categories.length === 0 && (
                <EmptyListPlaceholder
                    img={emptyList}
                    title="Your list of categories is empty"
                    firstLine="Add new category of goods in the form below"
                    secondLine='(tomatoes, rice, milk etc.)'
                />
            )}
            {categories.length > 0 && (
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
