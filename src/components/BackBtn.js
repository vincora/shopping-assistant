import React from "react";

const BackBtn = ({children, onClick}) => {
    return (
        <button
            className="w-full hover:text-gray-300"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default BackBtn;
