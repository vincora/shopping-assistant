import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/itemsSlice";
import Button from "./Button";
import { cn, safeEvaluate } from "../utils";
import { useTranslation } from "react-i18next";

const schema = z.object({
    pricePerPackage: z
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
            pricePerPackage: "",
            notes: "",
        },
        resolver: zodResolver(schema),
    });

    const { categoryId } = useParams();
    const navigate = useNavigate();

    const onSubmit = (item) => {
        item.amount = safeEvaluate(item.amount);
        item.pricePerPackage = safeEvaluate(item.pricePerPackage);
        dispatch(addItem({ categoryId, item }));
        reset();
    };

    const { t } = useTranslation();

    return (
        <form
            className=" pt-6 bg-white grid grid-cols-2 gap-3 border-t mt-3"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <textarea
                className="p-3 resize-none border rounded w-full col-span-2"
                {...register("notes")}
                placeholder={t('notes')}
                tabIndex="3"
            ></textarea>

            <label>
                <input
                    className={cn(
                        "border rounded p-3 w-full",
                        errors.pricePerPackage && "outline-red-600"
                    )}
                    {...register("pricePerPackage")}
                    type="text"
                    name="pricePerPackage"
                    placeholder={t('pricePerPackage')}
                    inputMode="decimal"
                    tabIndex="1"
                    id="myInput"
                />
            </label>

            <label>
                <input
                    className={cn(
                        "border rounded p-3 w-full",
                        errors.amount && "outline-red-600"
                    )}
                    {...register("amount")}
                    type="text"
                    name="amount"
                    placeholder={t('amount')}
                    inputMode="decimal"
                    tabIndex="2"
                />
            </label>

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}
                backBtn
                tabIndex="5"
                type="button"
            >
                {t('backButton')}
            </Button>

            <Button type="submit" tabIndex="4" id="myBtn">
                {t('addButton')}
            </Button>
        </form>
    );
};

export default ItemForm;
