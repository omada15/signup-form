import React, { useState, useMemo } from "react";
import { type KeyboardEvent } from "react"; 

interface DropdownSearchProps {
    label?: string
    options: Array<string>
    placeholder: string
    value: string
    onChange: (newValue: string) => void;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({
    label, 
    options,
    placeholder,
    value,
    onChange,
}) => {
    const [search, setSearch] = useState<string>("");
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    let boxLabel = null;
    if (label != null) {
        boxLabel = (
            <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
        );
    }

    const results = useMemo(() => {
        if (!search) return options;
        return options
            .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
            .sort((a) => {
                if (a.toLowerCase().startsWith(search.toLowerCase())) return -1;
                return 1;
            });
    }, [search, options]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Check if results exist before calling onChange
            if (search !== "" && results.length > 0) {
                onChange(results[0])    
                setSearch("")
                setShowDropDown(false)
            }
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
                    setSearch(e.target.value);
                    if (!showDropDown) setShowDropDown(true);
                }}
                onKeyDown={handleKeyDown}
                onClick={() => {
                    setShowDropDown((prev) => !prev);
                    setSearch("");
                }}
                className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"
            />
            
            {showDropDown && (
                <div className="bg-gray-700 p-4 border-gray-200 w-60 rounded-xl mt-1 overflow-hidden">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <div key={option} className="mb-2 last:mb-0">
                                <label 
                                    className="text-white cursor-pointer w-full hover:text-blue-400"
                                    onClick={() => {
                                        onChange(option);
                                        setShowDropDown(false);
                                    }}
                                >
                                    {option}
                                </label>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400 italic">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;