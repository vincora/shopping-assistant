import React from "react";

const Button = ({ children, onClick, type }) => {
    return (
        <button
            className="p-3 w-full bg-sky-500 hover:bg-sky-300 rounded text-white text-center cursor-pointer"
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;