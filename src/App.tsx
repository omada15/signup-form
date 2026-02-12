import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)
    const [id, setid] = useState("")

    return (
        /* 'w-full min-h-screen' ensures the background actually fills the page */
        <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center text-white">
            <input
                type="text"
                className="bg-gray-200 text-black p-2 rounded"
                onChange={(e) => setid(e.target.value)}
            />
            <h1 className="text-4xl mt-4">Vite + React</h1>

            <button
                className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
                onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>

            <p className="mt-8 text-gray-400">
                Current ID: {id}
            </p>
        </div>
    )
}

export default App
