import { useMemo } from "react";
import style from "../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../store/itemsSlice";

const FirstPage = () => {
  const navigate = useNavigate();


  // const store = useSelector((state) => state.);
  const categories = useSelector((state) => state.items.categories);

  const dispatch = useDispatch();

  return (
    <div className={style.itemList}>
      {categories.map((item) => <div className={style.item} key={item.id} onClick={() => {navigate(`category/${item.id}`)}}>{item.category}</div>)}
      <button className={style.button} onClick={() => navigate("categoryForm")}>
        new category
      </button>
    </div>
  );
};

export default FirstPage;
