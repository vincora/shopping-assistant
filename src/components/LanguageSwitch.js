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
        <button
            className="text-sm uppercase text-gray-400"
            type="submit"
            onClick={() => toggleLanguage()}
        >
            {currLanguage}
        </button>
    );
};

export default LanguageSwitch;
