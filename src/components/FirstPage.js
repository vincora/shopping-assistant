import style from "../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FirstPage = () => {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.items.categories);

    return (
        <div className="flex flex-col gap-4">
            {categories.map((item) => (
                <div
                    className="p-3 border rounded-md"
                    key={item.id}
                    onClick={() => {
                        navigate(`category/${item.id}`);
                    }}
                >
                    {item.category}
                </div>
            ))}
            <button
                className="p-3 w-fit bg-sky-100 rounded-sm"
                onClick={() => navigate("categoryForm")}
            >
                new category
            </button>
        </div>
    );
};

export default FirstPage;
