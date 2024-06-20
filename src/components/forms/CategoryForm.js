import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../store/itemsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { v4 } from "uuid";
import { useEffect } from "react";
import { cn } from "../../utils";
import { useTranslation } from "react-i18next";

const fieldName = "category_not_search"; // search prefix is used to prevent safari autofill pop-up

const schema = z.object({
    [fieldName]: z.string().nonempty("This field is required"),
});

const CategoryForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.goods.categories);

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
        if (categories.length === 0) {
            setFocus(fieldName);
        }
    }, [setFocus, categories.length]);

    const { t } = useTranslation();

    return (
        <form
            className="flex items-stretch gap-2 pt-6 border-t mt-3"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full bg-white">
                <input
                    className={cn(
                        "border rounded p-3 w-full focus-visible:outline-1",
                        errors[fieldName] && "border-red-600"
                    )}
                    type="text"
                    placeholder={t("categoryPlaceholder")}
                    {...register(fieldName)}
                    tabIndex="1"
                />
            </div>
            <div className="w-min">
                <Button
                    type="submit"
                    bgColor="bg-sky-500"
                    hoverBgColor="bg-sky-300"
                    tabIndex="2"
                >
                    {t("addButton")}
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;
