import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/itemsSlice";
import Button from "./Button";
import { cn, safeEvaluate } from "../utils";

const schema = z.object({
    pricePerItem: z
        .string()
        .refine(
            (value) => safeEvaluate(value) !== undefined,
            "Must be valid math expression"
        ),
    amount: z
        .string()
        .refine(
            (value) => safeEvaluate(value) !== undefined,
            "Must be valid math expression"
        ),
    notes: z.string().optional(),
});

const ItemForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: "",
            pricePerItem: "",
            notes: "",
        },
        resolver: zodResolver(schema),
    });

    const { categoryId } = useParams();
    const navigate = useNavigate();

    const onSubmit = (item) => {
        item.amount = safeEvaluate(item.amount);
        item.pricePerItem = safeEvaluate(item.pricePerItem);
        dispatch(addItem({ categoryId, item }));
        reset();
    };

    return (
        <form
            className=" pt-6 bg-white grid grid-cols-2 gap-3 border-t mt-3"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <textarea
                className="p-3 resize-none border rounded w-full col-span-2"
                {...register("notes")}
                placeholder="Notes"
                tabIndex="3"
            ></textarea>

            <label>
                <input
                    className={cn(
                        "border rounded p-3 w-full",
                        errors.pricePerItem && "outline-red-600"
                    )}
                    {...register("pricePerItem")}
                    type="text"
                    name="pricePerItem"
                    placeholder="Price per item"
                    inputMode="decimal"
                    tabIndex="1"
                />
            </label>

            <label>
                <input
                    className={cn(
                        "border rounded p-3 w-full",
                        errors.amount && "outline-red-600"
                    )}
                    type="text"
                    name="amount"
                    placeholder="Amount in units"
                    inputMode="decimal"
                    tabIndex="2"
                    {...register("amount")}
                />
            </label>

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}
                backBtn
                tabIndex="5"
            >
                Back
            </Button>

            <Button type="submit" tabIndex="4">
                Add
            </Button>
        </form>
    );
};

export default ItemForm;
