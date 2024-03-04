import React from "react";
import { Trans } from "react-i18next";

const EmptyListPlaceholder = ({ img, title, i18nKey }) => {
    return (
        <div className="grow flex flex-col justify-center items-center p-3 text-center">
            <img src={img} alt="" />
            <b className="text-secondary text-sm mt-6">{title}</b>
            <div className="text-secondary text-xs mt-3">
                <Trans i18nKey={i18nKey} />
            </div>
        </div>
    );
};

export default EmptyListPlaceholder;
