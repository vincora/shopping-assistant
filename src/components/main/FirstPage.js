import React from "react";
import style from "../../App.module.scss";
import { useNavigate, useOutletContext } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();
  const {sortedItems, itemList} = useOutletContext();
  return (
    <div>
      {itemList.length > 0 && (
        <div className={style.itemList}>
          {sortedItems.map((item) => {
            return (
              <div className={style.item} key={`${item.price}+${item.amount}`}>
                <div>Amount: {item.amount}</div>
                <div>Price: {item.price}</div>
                <div>Price per kg: {item.pricePerUnit}</div>
                <div>Notes: {item.notes}</div>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={() => navigate("form", { replace: false })}>
        add new item
      </button>
    </div>
  );
};

export default FirstPage;
