import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/itemsSlice";
import Button from "./Button";
import BackBtn from "./BackBtn";
import { useEffect } from "react";

const onlyNumbers = ({ onChange, ...rest }) => {
    const handleChange = (e) => {
        let count = 0;

        e.target.value = e.target.value
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
            .replace(/[.]/g, () => (count++ === 0 ? "." : ""));

        onChange.call(this, e);
    };

    return { onChange: handleChange, ...rest };
};

const schema = z.object({
    amount: z.string().nonempty("This field is required"),
    pricePerItem: z.string().nonempty("This field is required"),
    notes: z.string().optional(),
});

const ItemForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus,
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
        dispatch(addItem({ categoryId, item }));
        reset();
    };
    useEffect(() => {
        setFocus("amount");
    }, [setFocus]);

    return (
        <form
            className=" pt-6 bg-white grid grid-cols-2 gap-3 border-t"
            onSubmit={handleSubmit(onSubmit)}
        >
            <textarea
                className="p-3 resize-none border rounded w-full col-span-2"
                {...register("notes")}
                placeholder="notes"
            ></textarea>

            <label>
                <input
                    className={clsx(
                        "border rounded p-3 w-full",
                        errors.amount && "border-red-600"
                    )}
                    {...onlyNumbers(register("amount"))}
                    type="text"
                    name="amount"
                    placeholder="amount in units"
                    inputMode="decimal"
                />
            </label>
            <label>
                <input
                    className={clsx(
                        "border rounded p-3 w-full",
                        errors.pricePerItem && "border-red-600"
                    )}
                    {...onlyNumbers(register("pricePerItem"))}
                    type="text"
                    name="pricePerItem"
                    placeholder="price per item"
                    inputMode="decimal"
                />
            </label>

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}
                backBtn
            >
                Back
            </Button>

            <Button type="submit">
                Add
            </Button>
        </form>
    );
};

export default ItemForm;
