import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/itemsSlice";
import Button from "./Button";
import clsx from "clsx";

const fieldName = "category_not_search"; // search prefix is used to prevent safari autofill pop-up

const schema = z.object({
    [fieldName]: z.string().nonempty("This field is required"),
});

const CategoryForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(addCategory(data[fieldName]));
        reset();
    };

    return (
        <form
            className="bg-white flex items-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full">
                <input
                    className={clsx(
                        "border rounded p-3 w-full",
                        errors[fieldName] && "border-red-600"
                    )}
                    type="text"
                    placeholder="category name"
                    {...register(fieldName)}
                />
            </div>
            <div className="">
                <Button type="submit">add</Button>
            </div>
        </form>
    );
};

export default CategoryForm;
