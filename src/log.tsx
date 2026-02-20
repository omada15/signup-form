//const link = "https://signup-form-mango.vercel.app";
const link = "http://localhost:3001"
export async function log(level: string, message: string) {
    try {
        await fetch(`${link}/log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ level, message })
        });
    } catch (err) {
        console.error("Logging failed:", err);
    }
}
export async function inn(name: string) {
    try{
        await fetch(`${link}/in`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: name})
            }
        )
    } catch (e) {
        console.error(e);
    }
}

export async function out(name: string) {
    try {
        await fetch(`${link}/out`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: name })
            }
        )
    } catch (e) {
        console.error(e);
    }
}

export async function nnn(name: string) {
    try {
        await fetch(`${link}/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: name })
            }
        )
    } catch (e) {
        console.error(e);
    }
}