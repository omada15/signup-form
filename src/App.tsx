import { useState } from "react"
import DropdownSearch from "./Components/DropdownSearch"

function submit() {

}
function App() {

    const [id, setid] = useState<string>("");
    const [page, setpage] = useState(0)

    const [changeid, setchangeid] = useState<string>("")
    const [changeName, setChangeName] = useState<string>("")

    let content = null

    if (page == 0) {
        content = (
            <div className="items-center justify-center flex flex-col">
                <DropdownSearch
                    label="Search name"
                    options={["dihney pluh", "cuh"]}
                    placeholder="Search..."
                    onChange={setid}
                    value={id}
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
