import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
    const { i18n } = useTranslation();

    const currLanguage = i18n.resolvedLanguage;
    const toggleLanguage = () => {
        if (currLanguage === "en") {
            i18n.changeLanguage("ru");
        } else if (currLanguage === "ru") {
            i18n.changeLanguage("en");
        }
    };

    return (
        <div className="h-full flex items-center">
            <button
                className="text-sm text-gray-400 uppercase"
                type="submit"
                onClick={() => toggleLanguage()}
            >
                {currLanguage}
            </button>
        </div>
    );
};

export default LanguageSwitch;
