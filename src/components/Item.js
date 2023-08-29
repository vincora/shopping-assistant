const Item = ({ item }) => {
    return (
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
    );
};

export default Item;
