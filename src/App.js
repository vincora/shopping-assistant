import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <div className="container mx-auto">
                <h1 className="text-xl font-medium text-center p-4">
                    Shopping assistant
                </h1>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
