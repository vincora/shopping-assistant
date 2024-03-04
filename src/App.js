import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const lngs = {
    en: { nativeName: "EN" },
    ru: { nativeName: "RU" },
};

function App() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col max-w-sm mx-auto h-[100dvh] p-6 box-border md:max-w-2xl relative">
            <Outlet />
        </div>
    );
}

export default App;
