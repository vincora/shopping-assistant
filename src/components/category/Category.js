import React from "react";
import style from "./Category.module.scss";
import { useForm } from "react-hook-form";

const Category = () => {
  const { register } = useForm({
    defaultValues: {
      category: {
        name: "",
        amount: '',
        price: '',
        notes: "",
      },
    },
  });

  return (
    <div>
      <div className={style.title}>Category</div>
      <form action="" className={style.inputs}>
        <input type="text" {...register("category.name")} placeholder="name" />
        <input
          type="text"
          {...register("category.amount")}
          placeholder="amount"
        />
        <input
          type="text"
          {...register("category.price")}
          placeholder="price"
        />
        <input
          type="text"
          {...register("category.notes")}
          placeholder="notes"
        />
        <button className={style.button}>add new item</button>
      </form>
    </div>
  );
};

export default Category;
