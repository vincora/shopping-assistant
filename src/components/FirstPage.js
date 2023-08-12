import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import Category from "./Category";
import CategoryForm from "./CategoryForm";

const FirstPage = () => {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.items.categories);

    return (
        <div>
            <h1 className="text-xl font-medium text-center mb-4">
                Shopping assistant
            </h1>
            {categories.map((category) => (
                <Category category={category} dispatch/>
            ))}
            <div className="absolute bottom-5 left-5 right-5 max-w-sm mx-auto">
                <CategoryForm></CategoryForm>
                {/* <Button onClick={() => navigate("categoryForm")}>
                new category
                </Button> */}
            </div>
        </div>
    );
};

export default FirstPage;
