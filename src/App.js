import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="max-w-sm mx-auto p-4 space-y-4 h-screen box-border relative">
            <Outlet />
        </div>
    );
}

export default App;
