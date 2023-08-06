import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import style from "../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/itemsSlice";

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
    defaultValues: {
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addCategory(data.category));
    navigate("/", {replace: true});
  };

  const navigate = useNavigate();

  return (
    <form className={style.inputList} onSubmit={handleSubmit(onSubmit)}>
      <div>New category</div>
      <p className={style.error}>{errors.category?.message}</p>
      <input type="text" {...register("category")} />
      <button type="submit">add new category</button>
    </form>
  );
};

export default CategoryForm;
