import { useState } from "react"
import { read, write } from "./store"

import DropdownSearch from "./Components/DropdownSearch"
import BinaryChoice from "./Components/BinaryButton";
import { log } from "./log";

async function makeStudent(name: string, id: string, func: Function) {
    const array = read("students");

    if (!array.includes(name)) array.push(name);
    let data = {
        name,
        id,
    }
    write("students", array);
    write(name, data);
    log("CREATE", `new user "${name}" with id "${id}"`)
    func(0)
}

interface StudentEntry {
    name: string;
    id: string;
}

interface SchoolData {
    students: string[];
    [key: string]: any;
}

function idToName(data: SchoolData, targetId: string): string | null {
    if (!data?.students || !Array.isArray(data.students)) {
        return null;
    }

    // Iterate through the keys in the students array
    for (const key of data.students) {
        const student = data[key] as StudentEntry | undefined;

        if (student?.id === targetId) {
            return student.name;
        }
    }

    return null;
}

function App() {
    if (!(localStorage.getItem("data"))) {
        localStorage.setItem("data", JSON.stringify({ "students": [], }));
    }
    const [name, setName] = useState<string>("");
    const [id, setid] = useState<string>("");
    const [page, setpage] = useState(0)

    const [changeName, setChangeName] = useState<string>("");
    const [changeid, setChangeid] = useState<string>("");

    const [diddy, setDiddy] = useState<boolean>(true)

    let content = null

    const swithname = () => {
        if (!read("students").includes(name)) {
            alert ("ur name's wrong bro");
        } else {
            log("SIGN", `USER ${name} signed in with name`);
        }
    }

    const s = () => {
        if (id) {
            if (!idToName(read(""), id)) {
                log("SIGN", `USER ${idToName(read(""), id)} signed in with id`)
            } else {
                swithname()
            }
        } else {
            swithname()
        }
    };

    if (page == 0) {
        content = (
            <div className="items-center justify-center flex flex-col w-1/2 flex-grow">
                <DropdownSearch
                    label="Search name"
                    options={read("students")}
                    placeholder="Search..."
                    onChange={setid}
                    value={id}
                />

                <BinaryChoice
                    label=""
                    options={["Sign in", "Sign out"]}
                    value={diddy}
                    onChange={setDiddy}
                />

                <div className="p-4 items-center justify-center flex flex-col">
                    <p className="pb-4">Click on textbox below then scan to input studentid</p>
                    <input onChange={(e) => setid(e.target.value)} placeholder="studentid" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"></input>

                    <div className="pt-4 pb-4"><button className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={() => { s }}>Submit</button>
                    </div>
                    <button className="p-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={() => { setpage(1) }}>update/register self</button>

                </div>
            </div>
        )
    } else {
        content = (
            <div className="items-center justify-center flex flex-col">
                <div className="p-4 items-center justify-center flex flex-col">
                    <input placeholder="enter your name" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-80 bg-gray-700 rounded-full focus-within:outline-auto relative" onChange={(e) => { setChangeName(e.target.value) }}></input>
                    <div className="pt-4 pb-4">
                        <input placeholder="enter 5 digit code on student id" className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-80 bg-gray-700 rounded-full focus-within:outline-auto relative" onChange={(e) => { setChangeid(e.target.value) }}></input>
                    </div>
                    <button className="pt-4 cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative" onClick={() => { makeStudent(changeName, changeid, setpage) }}>Submit</button>
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
