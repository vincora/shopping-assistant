import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";

const FirstPage = () => {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.items.categories);

    return (
        <div className=" flex flex-col">
            {categories.map((item) => (
                <div
                    className=" bg-white cursor-pointer p-3 hover:bg-gray-100"
                    key={item.id}
                    onClick={() => {
                        navigate(`category/${item.id}`);
                    }}
                >
                    {item.category}
                </div>
            ))}
            <div className="fixed bottom-5 left-0 right-0 max-w-sm mx-auto">
                <Button onClick={() => navigate("categoryForm")}>
                    new category
                </Button>
            </div>
        </div>
    );
};

export default FirstPage;
