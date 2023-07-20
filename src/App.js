import style from './App.module.scss';
import Category from './components/category/Category';


function App() {

  return (
    <div className="App">
      <div className={style.container}>
        <Category/>
      </div>
    </div>
  );
}

export default App;
