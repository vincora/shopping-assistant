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
        navigate(`/category/${categoryId}`, { replace: true });
    };

    return (
        <div>
            <div className="text-xl text-center capitalize font-medium mb-4">New item</div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <p className={style.error}>{errors.amount?.message}</p>
                    <input
                        className="p-3 border w-full"
                        {...onlyNumbers(register("amount"))}
                        type="text"
                        placeholder="amount in units"
                    />
                </label>
                <label>
                    <p className={style.error}>{errors.price?.message}</p>
                    <input
                        className="p-3 border w-full"
                        {...onlyNumbers(register("pricePerItem"))}
                        type="text"
                        placeholder="price per item"
                    />
                </label>
                <label>
                    <textarea
                        className="p-3 resize-none border w-full"
                        {...register("notes")}
                        placeholder="notes"
                    ></textarea>
                </label>
                <div className='flex gap-2 absolute bottom-5 left-5 right-5 max-w-sm mx-auto'>
                    <BackBtn
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/category/${categoryId}`);
                        }}
                    >Back</BackBtn>
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;
