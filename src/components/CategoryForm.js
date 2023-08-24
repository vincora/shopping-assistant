import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/itemsSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import clsx from "clsx";
import { v4 } from "uuid";
import { useEffect } from "react";

const fieldName = "category_not_search"; // search prefix is used to prevent safari autofill pop-up

const schema = z.object({
    [fieldName]: z.string().nonempty("This field is required"),
});

const CategoryForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        const id = v4();
        dispatch(addCategory({ category: data[fieldName], id }));
        navigate(`category/${id}`);
    };
    useEffect(() => {
        setFocus(fieldName);
    }, [setFocus]);

    return (
        <form
            className="flex items-center gap-2 pt-6 border-t"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full bg-white">
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
