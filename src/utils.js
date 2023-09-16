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
