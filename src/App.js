import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./App.module.scss";

function App() {
  const [page, setPage] = useState(0);
  const [item, setItem] = useState({
    amount: 0,
    price: 0,
    notes: "",
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setItem(data);
    setPage(0);
  };
  return (
    <div className="App">
      <div className={style.container}>
        {page === 0 && (
          <div className="">
            {item.amount > 0 &&
              <div className={style.item}>
                <div>Amount: {item.amount}</div>
                <div>Price: {item.price}</div>
                <div>
                  Price per kg: {Number(item.price) / Number(item.amount)}
                </div>
              </div>
            }
            <button onClick={() => setPage(1)}>add new item</button>
          </div>
        )}
        {page === 1 && (
          <form className={style.inputs} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.title}>New item</div>
            <input
              type="text"
              {...register("amount")}
              placeholder="amount in kg"
            />
            <input type="text" {...register("price")} placeholder="price" />
            <input type="text" {...register("notes")} placeholder="notes" />
            <button type="submit">add</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
