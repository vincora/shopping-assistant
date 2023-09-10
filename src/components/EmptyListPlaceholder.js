import React from "react";

const EmptyListPlaceholder = ({img, title, firstLine, secondLine}) => {
    return (
        <div className="grow flex flex-col justify-center items-center p-3 text-center">
            <img src={img} alt="" />
            <b className="text-secondary text-sm mt-6">
                {title}
            </b>
            <div className="text-secondary text-xs mt-3">
                {firstLine}<br/>
                {secondLine}
            </div>
        </div>
    );
};

export default EmptyListPlaceholder;
