import React from "react";

const Item = ({ item }) => {
    return (
        <div className="border p-3">
            <div className="grid grid-cols-2 text-sm" key={item.id}>
                <div>Amount (kg / litres):</div>
                <div className="text-right">{item.amount}</div>
                <div>Price:</div>
                <div className="text-right">{item.pricePerItem}</div>
                <div>Price per kg/liter:</div>
                <div className="text-right">{item.pricePerUnit}</div>
                {item.notes && <div>Notes:</div>}
                <div className="text-right">{item.notes}</div>
            </div>
            {/* <div className="w-full text-right">
                                <Button
                                    onClick={() =>
                                        dispatch(deleteItem({ categoryId, item }))
                                    }
                                    remove
                                >
                                    <div className="icon-icon-delete"></div>
                                </Button>
                            </div> */}
        </div>
    );
};

export default Item;
