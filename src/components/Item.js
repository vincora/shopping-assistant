import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/itemsSlice";


const Item = ({ item, categoryId }) => {
    const ref = useRef();
    const dispatch = useDispatch();

    let x1 = null;
    let y1 = null;
    let xDiff = null;
    let yDiff = null;

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

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < 0) {
                console.log("left");
                ref.current.style.left = xDiff + "px";
            }
        }
    };

    const handleTouchEnd = () => {
        const width = ref.current.offsetWidth;
        if (Math.abs(xDiff) < width * 0.3){
            ref.current.style.left = 0 + "px";
        } else {
            ref.current.style.left = width + "px";
            dispatch(deleteItem({ categoryId, item }));
        }
    };

    return (
        <div className="border rounded relative">
            <div
                className="grid grid-cols-2 p-3 text-sm bg-white relative z-10 transition duration-500"
                key={item.id}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={ref}
            >
                <div>Price:</div>
                <div className="text-right">{item.pricePerItem}</div>
                <div>Amount (kg / litres):</div>
                <div className="text-right">{item.amount}</div>
                <div>Price per kg/liter:</div>
                <div className="text-right">{item.pricePerUnit}</div>
                {item.notes && <div className="col-span-2">Notes:</div>}
                <div className="col-span-2">{item.notes}</div>
            </div>
            <div className={"absolute left-0 top-0 bottom-0 right-0 bg-red-700 z-0"}></div>
        </div>
    );
};

export default Item;
