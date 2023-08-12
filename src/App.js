import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="max-w-sm mx-auto p-4 space-y-4 h-screen box-border">
            <div className="">
                <h1 className="text-xl font-medium text-center mb-3">
                    Shopping assistant
                </h1>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
