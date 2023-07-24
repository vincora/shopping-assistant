import style from "./App.module.scss";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className={style.container}>
        <h1 className={style.title}>Shopping assistant</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
