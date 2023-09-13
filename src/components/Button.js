import React from "react";
import { cn } from "../utils";

const Button = ({ children, onClick, type, backBtn }) => {

    return (
        <button
            className={cn(
                "p-3 w-full rounded text-center cursor-pointer text-white bg-primary hover:bg-secondary",
                {
                    "bg-white hover:bg-white text-gray-400 hover:text-black":
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
