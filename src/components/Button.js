import React from "react";
import { cn } from "../utils";

const Button = ({ children, onClick, type, backBtn, tabIndex }) => {

    return (
        <button
            className={cn(
                "p-3 w-full h-full rounded text-center cursor-pointer text-white bg-primary hover:bg-secondary focus:outline-offset-4 focus:outline-2",
                {
                    "bg-white hover:bg-white text-gray-400 hover:text-black":
                        backBtn,
                   
                }
            )}
            onClick={onClick}
            type={type}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
};

export default Button;
