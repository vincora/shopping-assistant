
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteItem } from "../store/itemsSlice";

const Item = ({ item }) => {

    const dispatch = useDispatch();
    const { categoryId } = useParams();

    return (
        <div className="group">
            <div
                className="grid grid-cols-[2fr_1fr] p-3 md:p-5 text-sm bg-white border rounded"
                key={item.id}
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
            <div className="hidden group-hover:md:flex justify-end items-start absolute top-0 -right-9 w-1/2 h-full">
                <button
                    className="p-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (
                            !window.confirm(
                                `Do you want to delete ${item.name} category?`
                            )
                        ) {
                            return false;
                        }
                        dispatch(deleteItem({ categoryId, item }));
                    }}
                >
                    <div className="icon-icon-delete text-gray-300 hover:text-gray-500"></div>
                </button>
            </div>
        </div>
    );
};

export default Item;
