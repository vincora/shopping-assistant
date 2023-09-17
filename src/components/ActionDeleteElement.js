import { useRef } from "react";
import { cn } from "../utils";
import {isMobile} from 'react-device-detect';


const ActionDeleteElement = ({ children, onAction }) => {
    const ref = useRef();

    let x1 = null;
    let y1 = null;
    let xDiff = null;
    let yDiff = null;

    let swipeFinish = false;

    const handleTouchStart = (event) => {
        x1 = event.touches[0].clientX;
        y1 = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;

        xDiff = x2 - x1;
        yDiff = y2 - y1;

        if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
            ref.current.style.transform = `translateX(${xDiff}px)`;
        }
    };

    const handleTouchEnd = () => {
        if (xDiff > 0) {
            return;
        }
        const width = ref.current.offsetWidth;
        if (Math.abs(xDiff) < width * 0.3) {
            ref.current.style.transform = `translateX(0)`;
        } else {
            ref.current.style.transform = `translateX(${-width}px)`;
            swipeFinish = true;
        }
    };

    const handleTransitionEnd = () => {
        if (!swipeFinish || !onAction()) {
            ref.current.style.transform = `translateX(0)`;
            swipeFinish = false;
        }
    };

    
    return (
        <div
            className={cn("w-full relative", {'w-10/12': !isMobile})}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className="relative z-10 transition-transform duration-200 ease-linear group"
                ref={ref}
            >
                {children}
                {!isMobile && (
                    <div className="hidden group-hover:md:flex justify-end items-center absolute top-0 -right-9 w-12 h-full">
                        <button
                            className="p-3 icon-delete h-full text-gray-300 hover:text-gray-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAction();
                            }}
                        ></button>
                    </div>
                )}
            </div>
            <div className="absolute inset-0 z-0 flex">
                <div className="w-full bg-red-700 flex justify-end items-center p-3 border rounded">
                    <div className="icon-delete text-white text-right"></div>
                </div>
            </div>
        </div>
    );
};

export default ActionDeleteElement;
