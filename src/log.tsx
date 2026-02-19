export async function log(level: string, message: string) {
    try {
        await fetch("http://localhost:3001/log", {
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