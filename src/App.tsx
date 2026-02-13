import { useState } from "react"
import DropdownSearch from "./Components/DropdownSearch"

function App() {

    const [goon, setgoon] = useState<string>("");

    return (
        <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center text-white">
            {goon}
            <DropdownSearch
                label="Search name"
                options={["SAM GOON", "SAM BUST", "21079", "WILL DING", "MASON DONG", "DANIEL SENCHUKOV"]}
                placeholder="Search..."
                onChange={setgoon}
            />
        </div>
    )
}

export default App
