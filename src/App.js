import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="max-w-sm mx-auto h-[100dvh] p-4 pb-12 box-border">
            <Outlet />
        </div>
    );
}

export default App;
