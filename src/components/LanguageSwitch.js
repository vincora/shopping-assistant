import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
    const lngs = {
        en: { nativeName: "EN" },
        ru: { nativeName: "RU" },
    };
    const { t, i18n } = useTranslation();
    return (
        <div className="space-x-1">
            {Object.keys(lngs).map((lng) => (
                <button
                    className="text-sm text-gray-400"
                    key={lng}
                    style={{
                        fontWeight:
                            i18n.resolvedLanguage === lng ? "bold" : "normal",
                    }}
                    type="submit"
                    onClick={() => i18n.changeLanguage(lng)}
                >
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitch;
