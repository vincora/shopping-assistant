import { Fragment } from "react";

const Item = ({ item }) => {
    const fullUrlRegex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9!@:%_+.~#?&/=]*)/gi;

    const domainRegex =
        /(www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b)/i;

    const arrayFromNotesString = (str) => {
        const matches = Array.from(str.matchAll(fullUrlRegex));

        const indexes = matches.reduce((acc, match) => {
            acc.push(match.index);
            acc.push(match.index + match[0].length);

            return acc;
        }, []);

        const checkpoints = [0, ...indexes, str.length];

        let result = [];
        for (let i = 0; i < checkpoints.length - 1; i++) {
            result.push(str.substring(checkpoints[i], checkpoints[i + 1]));
        }
        return result;
    };

    return (
        <div
            className="grid grid-cols-[2fr_1fr] p-3 md:p-5 text-sm bg-white border rounded"
            key={item.id}
        >
            <div>Price per package:</div>
            <div className="text-right">{item.pricePerPackage}</div>
            <div>Amount (kilos, liters, pieces):</div>
            <div className="text-right">{item.amount}</div>
            <div>Price per 1 kg/liter/piece:</div>
            <div className="text-right">{item.pricePerUnit}</div>
            {item.notes && <div className="col-span-2">Notes:</div>}
            {item.notes && (
                <div className="break-words col-span-2">
                    {arrayFromNotesString(item.notes).map((str, index) => {
                        if (!fullUrlRegex.test(str)) {
                            return <Fragment key={str + index}>{str}</Fragment>;
                        }
                        return (
                            <a
                                key={str + index}
                                href={str}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline underline-offset-2"
                            >
                                {" "}
                                {str.match(domainRegex)[2]}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Item;
