import { useState } from "react"
import DropdownSearch from "./Components/DropdownSearch"
import BinaryChoice from "./Components/BinaryButton"; 

function App() {

    const [id, setid] = useState<string>("");
    const [page, setpage] = useState(0)

    const [diddy, setDiddy] = useState<boolean>(false)

    let content = null

    const submit = () => {
        
    }

    if (page == 0) {
        content = (
            <div className="items-center justify-center flex flex-col w-1/2 flex-grow">
                <DropdownSearch
                    label="Search name"
                    options={["sam rainbow", "cuh", "ding 💋💋 dong"]}
                    placeholder="Search..."
                    onChange={setid}
                    value={id}
                />

                <BinaryChoice
                    label=""
                    options={["Sign in","Sign out"]}
                    value={diddy}
                    onChange={setDiddy}
                />

                <div className="p-4 items-center justify-center flex flex-col">
                    <p className="pb-4">Click on textbox below to input studentid</p>
                    <input placeholder="studentid" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"></input>

                    <div className="pt-4 pb-4"><button className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={submit}>Submit</button>
                    </div>
                    <button className="p-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={() => {setpage(1)}}>update/register self</button>

                </div>
            </div>
        )
    } else {
        content = (
            <div className="items-center justify-center flex flex-col">
                <div className="p-4 items-center justify-center flex flex-col">
                    <input placeholder="enter your student id" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"></input>
                    <div className="pt-4 pb-4">
                        <input placeholder="name" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"></input>
                    </div>
                    <button className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={submit}>Submit</button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center text-white font-sans">

            {content}
        </div>
    )
}

export default App
