import { useState, useMemo } from "react";
import style from "./App.module.scss";
import { Outlet } from "react-router-dom";

function App() {
  const [itemList, setItemList] = useState([]);
  const sortedItems = useMemo(
    () => itemList.sort((a, b) => a.pricePerUnit - b.pricePerUnit),
    [itemList]
  );

  return (
    <div className="App">
      <div className={style.container}>
        <Outlet context={{sortedItems, itemList, setItemList}}/>
      </div>
    </div>
  );
}

export default App;
