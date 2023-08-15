import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import style from "../App.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/itemsSlice";
import Button from "./Button";
import BackBtn from "./BackBtn";

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

    return (
        <form className="space-y-3 pt-4 bg-white" onSubmit={handleSubmit(onSubmit)}>
            <textarea
                className="p-3 resize-none border rounded w-full"
                {...register("notes")}
                placeholder="notes"
            ></textarea>
            <div className="flex gap-3">
                <label>
                    <p className={style.error}>{errors.amount?.message}</p>
                    <input
                        className="p-3 border rounded w-full"
                        {...onlyNumbers(register("amount"))}
                        type="text"
                        name='amount'
                        placeholder="amount in units"
                    />
                </label>
                <label>
                    <p className={style.error}>{errors.price?.message}</p>
                    <input
                        className="p-3 border rounded w-full"
                        {...onlyNumbers(register("pricePerItem"))}
                        type="text"
                        name='pricePerItem'
                        placeholder="price per item"
                    />
                </label>
            </div>

            <div className="flex gap-2 bottom-5 left-5 right-5 max-w-sm mx-auto">
                <BackBtn
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    Back
                </BackBtn>
                <Button type="submit">Add</Button>
            </div>
        </form>
    );
};

export default ItemForm;
