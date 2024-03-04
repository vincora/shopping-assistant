import { useSelector } from "react-redux";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import ActionDeleteElement from "./ActionDeleteElement";
import { deleteCategory } from "../store/itemsSlice";
import { useDispatch } from "react-redux";
import emptyList from "../images/EmptyInbox.png";
import EmptyListPlaceholder from "./EmptyListPlaceholder";
import { useTranslation } from "react-i18next";

const lngs = {
    en: { nativeName: "English" },
    ru: { nativeName: "Russian" },
};

const FirstPage = () => {
    const categories = useSelector((state) => state.goods.categories);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    
    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-medium text-center text-primary mb-6">
                {t("appTitle")}
            </h1>
            <div className="text-center space-x-3">
                {Object.keys(lngs).map((lng) => (
                    <button
                        key={lng}
                        style={{
                            fontWeight:
                                i18n.resolvedLanguage === lng
                                    ? "bold"
                                    : "normal",
                        }}
                        type="submit"
                        onClick={() => i18n.changeLanguage(lng)}
                    >
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
            {categories.length === 0 && (
                <EmptyListPlaceholder
                    img={emptyList}
                    title={t("noCategoryTitle")}
                    i18nKey="noCategoryDescription"
                />
            )}
            {categories.length > 0 && (
                <div className="grow overflow-y-scroll flex flex-col items-center gap-3 ">
                    {categories.map((category) => {
                        const onCategoryDelete = () => {
                            if (category.items.length === 0) {
                                dispatch(deleteCategory(category.id));
                            } else if (
                                !window.confirm(
                                    `Do you want to delete ${category.category} category?`
                                )
                            ) {
                                return false;
                            }
                            dispatch(deleteCategory(category.id));
                        };
                        return (
                            <ActionDeleteElement
                                key={category.id}
                                onAction={onCategoryDelete}
                            >
                                <Category category={category} />
                            </ActionDeleteElement>
                        );
                    })}
                </div>
            )}
            <div>
                <CategoryForm />
            </div>
        </div>
    );
};

export default FirstPage;
