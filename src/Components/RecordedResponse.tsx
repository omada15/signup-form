import React, { useState, useMemo } from "react";
import { type KeyboardEvent } from "react"; 

interface RecordedResponseSearchProps {
    label?: string
    options: Array<string>
    placeholder: string
    value: string
    onChange: (newValue: string) => void;
    onEnter: (finalValue: string) => void;
}

const RecordedResponse: React.FC<RecordedResponseSearchProps> = ({
    label, 
    placeholder,
    value,
    onChange,
    onEnter,
}) => {
    const [id, setid] = useState<string>("")
    const [entered, setEntered] = useState<boolean>(false)

    let boxLabel = null;
    if (label != null) {
        boxLabel = (
            <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
        );
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEntered(true)
            onChange("")
            onEnter(value);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2 h-full">
            {boxLabel}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                
                onKeyDown={handleKeyDown}
                className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"
            />
        </div>
    );
};

export default RecordedResponse;