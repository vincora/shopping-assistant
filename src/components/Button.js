import React from "react";
import cn from "clsx";

const Button = ({ children, onClick, type, backBtn }) => {
    return (
        <button
            className={cn(
                "p-3 w-full rounded text-center cursor-pointer text-white bg-sky-500 hover:bg-sky-300",
                {
                    "bg-white hover:bg-white text-gray-500 hover:text-black":
                        backBtn,
                }
            )}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
