import style from "../App.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FirstPage = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.items.categories);

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
