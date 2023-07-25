import { useMemo } from "react";
import style from "../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../store/itemsSlice";

const FirstPage = () => {
  const navigate = useNavigate();
  const itemList = useSelector((state) => state.items.items);

  const sortedItems = useMemo(
    () =>
      itemList
        .map((item) => ({
          ...item,
          pricePerUnit: (item.pricePerItem / item.amount).toFixed(2),
        }))
        .sort((a, b) => a.pricePerUnit - b.pricePerUnit),
    [itemList]
  );

  const dispatch = useDispatch();

  return (
    <div className={style.itemList}>
      {sortedItems.map((item) => {
        return (
          <div className={style.item} key={item.id}>
            <div>Amount in units (kg/l/piece): {item.amount}</div>
            <div>Price per item: {item.pricePerItem}</div>
            <div>Price per units (kg/l/piece): {item.pricePerUnit}</div>
            {item.notes && <div>Notes: {item.notes}</div>}
            <button onClick={() => dispatch(deleteItem(item.id))}>
              delete item
            </button>
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
