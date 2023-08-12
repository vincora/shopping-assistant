import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { deleteCategory } from "../store/itemsSlice";

const FirstPage = () => {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.items.categories);
    const dispatch = useDispatch();

    return (
        <div>
            <h1 className="text-xl font-medium text-center mb-4">
                Shopping assistant
            </h1>
            {categories.map((item) => (
                <div
                    className=" bg-white cursor-pointer p-3 hover:bg-gray-100 flex justify-between"
                    key={item.id}
                    onClick={() => {
                        navigate(`category/${item.id}`);
                    }}
                >
                    <span>{item.category}</span>
                    <button className="icon-icon-delete text-gray-400" onClick={() => {
                        dispatch(deleteCategory(item.id))
                    }}></button>
                </div>
            ))}
            <div className="absolute bottom-5 left-5 right-5 max-w-sm mx-auto">
                <Button onClick={() => navigate("categoryForm")}>
                    new category
                </Button>
            </div>
        </div>
    );
};

export default FirstPage;
