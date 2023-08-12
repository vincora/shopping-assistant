import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";

const FirstPage = () => {
    const categories = useSelector((state) => state.items.categories);

    return (
        <div>
            <h1 className="text-xl font-medium text-center mb-4">
                Shopping assistant
            </h1>
            {categories.map((category) => (
                <Category category={category} />
            ))}
            <div className="absolute bottom-5 left-5 right-5 max-w-sm mx-auto">
                <CategoryForm></CategoryForm>
            </div>
        </div>
    );
};

export default FirstPage;
