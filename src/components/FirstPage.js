import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import ActionElement from "./ActionElement";
import { deleteCategory } from "../store/itemsSlice";
import { useDispatch } from "react-redux";

const FirstPage = () => {
    const categories = useSelector((state) => state.items.categories);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-medium text-center mb-4">
                Shopping assistant
            </h1>
            <div className="overflow-auto grow flex flex-col gap-3 ">
                {categories.map((category) => {
                    const onCategoryDelete = () => {
                        dispatch(deleteCategory(category.id));
                    };
                    return (
                        <ActionElement
                            key={category.id}
                            onAction={onCategoryDelete}
                        >
                            <Category category={category} />
                        </ActionElement>
                    );
                })}
            </div>
            <div>
                <CategoryForm></CategoryForm>
            </div>
        </div>
    );
};

export default FirstPage;
