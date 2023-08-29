import { useRef } from "react";

const ActionElement = ({
    children,
    onAction,
    backdrop = <BackdropActionRemove />,
}) => {
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
            return
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
            className="relative w-10/12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className="relative z-10 transition-transform duration-200 ease-linear"
                ref={ref}
            >
                {children}
            </div>
            <div className="absolute inset-0 z-0 flex">{backdrop}</div>
        </div>
    );
};

export const BackdropActionRemove = () => {
    return (
        <div className=" w-full bg-red-700 flex justify-end items-center p-3 border rounded">
            <div className="icon-icon-delete text-white text-right"></div>
        </div>
    );
};

export default ActionElement;
