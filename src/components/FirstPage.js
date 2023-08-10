import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";

const FirstPage = () => {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.items.categories);

    return (
        <div className=" flex flex-col gap-4 justify-between">
            {categories.map((item) => (
                <div
                    className="p-3 rounded bg-white"
                    key={item.id}
                    onClick={() => {
                        navigate(`category/${item.id}`);
                    }}
                >
                    {item.category}
                </div>
            ))}
            <Button onClick={() => navigate("categoryForm")}>
                new category
            </Button>
        </div>
    );
};

export default FirstPage;
