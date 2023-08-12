import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";

const FirstPage = () => {
    const categories = useSelector((state) => state.items.categories);

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-medium text-center mb-4 shrink-0">
                Shopping assistant
            </h1>
            <div className="overflow-auto grow">
                {categories.map((category) => (
                    <Category category={category} />
                ))}
            </div>
            <div className="shrink-0">
                <CategoryForm></CategoryForm>
            </div>
        </div>
    );
};

export default FirstPage;
