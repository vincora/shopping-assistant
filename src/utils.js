import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { evaluate } from 'mathjs';

export const cn = (...classes) => twMerge(clsx(classes));

const sanitizeExpression = (expr) => (expr ?? '').replace(/\s+/g, '').replace(/[.,]/g, '.');

export const safeEvaluate = (expr) => {
    try {
        return evaluate(sanitizeExpression(expr));
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const formatNumber = (num) => {
    if (num < 0) {
        throw new Error('Only positive numbers accepted');
    }
    const numString = num.toFixed(20);

    if (num < 0.01){
        const decimalIndex = numString.substring(2).search(/0[^0]/) + 1;
        return num.toFixed(decimalIndex + 2);
    }
    return num.toFixed(2);
};
