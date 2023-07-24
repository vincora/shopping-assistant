import { useMemo } from "react";
import style from "../../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FirstPage = () => {
  const navigate = useNavigate();
  const itemList = useSelector((state) => state.items.items);

  const sortedItems = useMemo(
    () => [...itemList].sort((a, b) => a.pricePerUnit - b.pricePerUnit),
    [itemList]
  );

  return (
    <div className={style.itemList}>
      {sortedItems.map((item) => {
        return (
          <div className={style.item} key={`${item.price}+${item.amount}`}>
            <div>Amount in units (kg/l/piece): {item.amount}</div>
            <div>Price per item: {item.pricePerItem}</div>
            <div>Price per units (kg/l/piece): {item.pricePerUnit}</div>
            {item.notes && <div>Notes: {item.notes}</div>}
          </div>
        );
      })}
      <button className={style.button} onClick={() => navigate("form")}>
        add new item
      </button>
    </div>
  );
};

export default FirstPage;
