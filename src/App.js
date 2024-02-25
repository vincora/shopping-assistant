import { Outlet } from "react-router-dom";

function App() {

    return (
        <div className="max-w-sm mx-auto h-[100dvh] p-6 box-border md:max-w-2xl">
            <Outlet />
        </div>
    );
}

export default App;
