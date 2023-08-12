import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/itemsSlice";
import Button from "./Button";
import BackBtn from "./BackBtn";

const schema = z.object({
    category: z.string().nonempty("This field is required"),
});

const CategoryForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(addCategory(data.category));
        navigate("/", { replace: true });
    };

    const navigate = useNavigate();

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <p className="text-sm text-right text-red-600">
                    {errors.category?.message}
                </p>
                <input
                    className="border rounded p-3 w-full"
                    type="text"
                    {...register("category")}
                />
            </div>
            <div className="flex gap-2 ">
                <BackBtn
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Back
                </BackBtn>
                <Button type="submit">Add new category</Button>
            </div>
        </form>
    );
};

export default CategoryForm;
