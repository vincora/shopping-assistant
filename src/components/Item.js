import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import * as linkify from "linkifyjs";
import * as punycode from "punycode/";

const Item = ({ item, showPriceDiff}) => {

    const arrayFromNotesString = (str) => {
        const fullUrls = linkify.find(str).filter((url) => url.type === "url");

        const indexes = fullUrls.reduce((acc, url) => {
            acc.push(url.start);
            acc.push(url.end);

            return acc;
        }, []);

        const checkpoints = [0, ...indexes, str.length];

        let result = [];
        for (let i = 0; i < checkpoints.length - 1; i++) {
            result.push(str.substring(checkpoints[i], checkpoints[i + 1]));
        }
        return result;
    };

    const makeUrl = (str) => {
        const newUrl = new URL(str);
        return punycode.toUnicode(newUrl.hostname).replace(/^www./, '');
    };

    const { t } = useTranslation();

    return (
        <div
            className="grid grid-cols-[2fr_1fr] p-3 md:p-5 text-sm bg-white border rounded"
            key={item.id}
        >
            <div>{t("pricePerPackage") + ":"}</div>
            <div className="text-right">{`${item.pricePerPackage}${showPriceDiff ? '/' + item.priceDiffWithTarget : ''}`}</div>
            <div>{t("amount") + ":"}</div>
            <div className="text-right">{item.amount}</div>
            <div>{t("pricePerKg") + ":"}</div>
            <div className="text-right">{item.pricePerUnit}</div>
            {item.notes && <div className="col-span-2">{t("notes") + ":"}</div>}
            {item.notes && (
                <div className="break-words col-span-2">
                    {arrayFromNotesString(item.notes).map(
                        (str, index) => {
                            if (!linkify.test(str, "url")) {
                                return (
                                    <Fragment key={str + index}>{str}</Fragment>
                                );
                            }
                            return (
                                <a
                                    key={str + index}
                                    href={str}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline underline-offset-2"
                                >
                                    {" "}
                                    {makeUrl(str)}
                                </a>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
};

export default Item;
