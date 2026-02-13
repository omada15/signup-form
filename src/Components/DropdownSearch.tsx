import React, { useState, useMemo } from "react";
import { type KeyboardEvent } from "react"; 

interface DropdownSearchProps {
    label?: string
    options: Array<string>
    placeholder: string
    onChange: (newValue: string) => void;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({
    label, 
    options,
    placeholder,
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

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (search !== ""){
                onChange(results[0])    
                setSearch("")
            }
        }
    };
 
    const results = useMemo(() => {
        if (!search) return options;
            return options
        .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
        .sort((a) => {
            if (a.toLowerCase().startsWith(search.toLowerCase())) return -1;
                return 1;
            });
    }, [search, options]);

     return (
         <div className="flex flex-col items-center space-y-2">
            {boxLabel}
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                 onClick={() => {setShowDropDown((showDropDown) => !showDropDown,); setSearch("")}}
                className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"
            />
            <div style={{ display: showDropDown ? "block" : "none" }} className="bg-gray-700 p-4 border-gray-200">
                {results.map((option) => (
                    <>
                        <label className="text-white hover:bg-gray-600">
                            <div onClick={() => {onChange(option)}}>
                                {option}
                            </div>
                        </label>
                        <br></br>
                    </>
                ))}
            </div>
        </div>
     );
};

export default DropdownSearch;
