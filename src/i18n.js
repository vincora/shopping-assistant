import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    appTitle: "Shopping assistant",
                    noCategoryTitle: "Your list of categories is empty",
                    noCategoryDescription:
                        "Add new category of goods in the form below <br />(tomatoes, rice, milk etc.)",
                    categoryPlaceholder: "Category name",
                    emptyListTitle: 'No items in this category yet',
                    emptyListDescription: `Add items to compare them <br /> by price per unit (kg,l,piece etc.)`,
                    addButton: 'Add',
                    backButton: 'Back',
                    notes: 'Notes',
                    pricePerPackage: 'Price per package',
                    amount: 'Amount',
                    pricePerKg: 'Price per 1 kg/liter/piece'
                },
            },
            ru: {
                translation: {
                    appTitle: "Помощник покупателя",
                    noCategoryTitle: "Ваш список категорий пуст",
                    noCategoryDescription:
                        "Добавьте новую категорию товаров в форму внизу <br /> экрана (помидоры, рис, молоко и т.д.)",
                    categoryPlaceholder: "Название категории",
                    emptyListTitle: 'В этой категории пока нет товаров',
                    emptyListDescription: 'Добавьте товары для сравнения  <br /> по цене за кг/литр/штуку',
                    addButton: 'Добавить',
                    backButton: 'Назад',
                    notes: 'Заметки',
                    pricePerPackage: 'Цена за упаковку',
                    amount: 'Количество',
                    pricePerKg: 'Цена за 1 кг/литр/штуку'
                },
            },
        },
    });

export default i18n;
