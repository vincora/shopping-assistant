import { useState } from "react";
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
      .replace(/[.]/g, () => (count++ == 0 ? "." : ""));

    onChange.call(this, e);
  };

  return { onChange: handleChange, ...rest };
};

const schema = z.object({
  amount: z.string().nonempty("This field is required"),
  price: z.string().nonempty("This field is required"),
});

function App() {
  const [page, setPage] = useState(0);
  const [item, setItem] = useState({
    amount: 0,
    price: 0,
    notes: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    setItem(data);
    setPage(0);
  };
  return (
    <div className="App">
      <div className={style.container}>
        {page === 0 && (
          <div>
            {item.amount > 0 && (
              <div className={style.item}>
                <div>Amount: {item.amount}</div>
                <div>Price: {item.price}</div>
                <div>
                  Price per kg: {Number(item.price) / Number(item.amount)}
                </div>
              </div>
            )}
            <button onClick={() => setPage(1)}>add new item</button>
          </div>
        )}
        {page === 1 && (
          <zodResolver>
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
                  type="text"
                  {...onlyNumbers(register("price"))}
                  placeholder="price per kg"
                />
              </label>
              <label className={style.input}>
                <input type="text" {...register("notes")} placeholder="notes" />
              </label>
              <button type="submit" className={style.button}>
                add
              </button>
            </form>
          </zodResolver>
        )}
      </div>
    </div>
  );
}

export default App;
