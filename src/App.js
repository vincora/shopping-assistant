import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import style from "./App.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  price: z.string().nonempty("This field is required"),
  notes: z.string().optional(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      amount: "",
      price: "",
      notes: "",
    },
    resolver: zodResolver(schema),
  });

  const [page, setPage] = useState(0);
  const [itemList, setItemList] = useState([]);

  const sortedItems = useMemo(
    () => itemList.sort((a, b) => a.pricePerUnit - b.pricePerUnit),
    [itemList]
  );

  const onSubmit = (data) => {
    setItemList([
      ...itemList,
      {
        amount: data.amount,
        price: data.price,
        pricePerUnit: +data.price / +data.amount,
        notes: data.notes,
      },
    ]);
    setPage(0);
    console.log(data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="App">
      <div className={style.container}>
        {page === 0 && (
          <div>
            {itemList.length > 0 && (
              <div className={style.itemList}>
                {sortedItems.map((item) => {
                  return (
                    <div
                      className={style.item}
                      key={`${item.price}+${item.amount}`}
                    >
                      <div>Amount: {item.amount}</div>
                      <div>Price: {item.price}</div>
                      <div>Price per kg: {item.pricePerUnit}</div>
                      <div>Notes: {item.notes}</div>
                    
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={() => setPage(1)}>add new item</button>
          </div>
        )}
        {page === 1 && (
          <form className={style.inputList} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.title}>New item</div>
            <label className={style.input}>
              <p className={style.error}>{errors.amount?.message}</p>
              <input
                {...onlyNumbers(register("amount"))}
                type="text"
                placeholder="amount in kg"
              />
            </label>
            <label className={style.input}>
              <p className={style.error}>{errors.price?.message}</p>
              <input
                {...onlyNumbers(register("price"))}
                type="text"
                placeholder="price per kg"
              />
            </label>
            <label className={style.input}>
              <input {...register("notes")} type="text" placeholder="notes" />
            </label>
            <button type="submit" className={style.button}>
              add
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
