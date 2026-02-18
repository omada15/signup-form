import { useState } from "react"
import { read, write } from "./store"

import DropdownSearch from "./Components/DropdownSearch"
import BinaryChoice from "./Components/BinaryButton";
import { log } from "./log";

async function makeStudent(name: string, id: string, func: Function) {
    const array = read("students");
    if (!array.includes(name)) array.push(name);
    let data = { name, id }
    write("students", array);
    write(name, data);
    log("CREATE", `new user "${name}" with id "${id}"`)
    func(0)
}

interface StudentEntry { name: string; id: string; }
interface SchoolData { students: string[]; [key: string]: any; }

function idToName(data: SchoolData, targetId: string): string | null {
    if (!data?.students || !Array.isArray(data.students)) return null;
    for (const key of data.students) {
        const student = data[key] as StudentEntry | undefined;
        if (student?.id === targetId) return student.name;
    }
    return null;
}

const inputClass = `
    w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10
    text-white placeholder-white/30 text-sm outline-none
    focus:border-amber-400/60 focus:bg-white/8 transition-all duration-200
`

const btnPrimary = `
    w-full py-3 rounded-2xl bg-amber-400 text-gray-900 font-semibold text-sm
    hover:bg-amber-300 active:scale-[0.98] transition-all duration-150 cursor-pointer
`

const btnSecondary = `
    w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-sm
    hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all duration-150 cursor-pointer
`

function Card({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) {
    return (
        <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
            className="w-full max-w-sm rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm">
            {(title || subtitle) && (
                <div className="mb-7">
                    {title && <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>}
                    {subtitle && <p className="text-sm text-white/40 mt-1">{subtitle}</p>}
                </div>
            )}
            {children}
        </div>
    )
}

function App() {
    if (!localStorage.getItem("data")) {
        localStorage.setItem("data", JSON.stringify({ "students": [] }));
    }

    const [name, setName] = useState<string>("")
    const [id, setid] = useState<string>("")
    const [page, setpage] = useState(0)
    const [changeName, setChangeName] = useState<string>("")
    const [changeid, setChangeid] = useState<string>("")
    const [diddy, setDiddy] = useState<boolean>(true)
    const [password, setPassword] = useState<boolean>(true)

    let content = null

    const swithname = () => {
        if (!read("students").includes(name)) {
            alert("ur name's wrong bro");
        } else {
            log("SIGN", `USER ${name} signed in with name`);
        }
    }

    const s = () => {
        if (id) {
            const foundName = idToName(read(""), id);
            if (foundName) {
                log("SIGN", `USER ${foundName} signed in with id`)
            } else {
                swithname()
            }
        } else {
            swithname()
        }
    };

    if (password) {
        content = (
            <Card title="Sign In" subtitle="Enter your password to continue">
                <input
                    type="password"
                    onChange={(e) => {
                        if (e.target.value === import.meta.env.VITE_SAMS_TIPTOUCHERY_PASSWORD) setPassword(false)
                    }}
                    placeholder="Password"
                    className={inputClass}
                />
            </Card>
        )
    } else if (page === 0) {
        content = (
            <Card title="Attendance" subtitle={diddy ? "Signing students in" : "Signing students out"}>
                <div className="flex flex-col gap-4">
                    <DropdownSearch
                        label=""
                        options={read("students")}
                        placeholder="Search by name..."
                        onChange={setName}
                        value={name}
                    />

                    <BinaryChoice
                        label=""
                        options={["Sign in", "Sign out"]}
                        value={diddy}
                        onChange={setDiddy}
                    />

                    <div className="border-t border-white/10 pt-4">
                        <p className="text-xs text-white/30 mb-2 uppercase tracking-widest">Or scan student ID</p>
                        <input
                            onChange={(e) => setid(e.target.value)}
                            placeholder="Student ID"
                            className={inputClass}
                        />
                    </div>

                    <button className={btnPrimary} onClick={s}>Submit</button>
                    <button className={btnSecondary} onClick={() => setpage(1)}>Register / Update</button>
                </div>
            </Card>
        )
    } else {
        content = (
            <Card title="Register" subtitle="Add or update a student profile">
                <div className="flex flex-col gap-4">
                    <input
                        placeholder="Full name"
                        className={inputClass}
                        onChange={(e) => setChangeName(e.target.value)}
                    />
                    <input
                        placeholder="5-digit student ID"
                        className={inputClass}
                        onChange={(e) => setChangeid(e.target.value)}
                    />
                    <button className={btnPrimary} onClick={() => makeStudent(changeName, changeid, setpage)}>Save</button>
                    <button className={btnSecondary} onClick={() => setpage(0)}>← Back</button>
                </div>
            </Card>
        )
    }

    return (
        <div className="bg-gray-950 min-h-screen w-full flex flex-col items-center justify-center text-white font-sans">
            {content}
        </div>
    )
}

export default App