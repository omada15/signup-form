import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

app.use(express.json());

// Ensure logs folder exists
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, "app.log");

app.post("/log", (req, res) => {
    const { level = "INFO", message } = req.body;

    const timestamp = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error("Failed to write log:", err);
            return res.status(500).send("Log failed");
        }
        res.send("Logged");
    });
});

app.listen(PORT, () => {
    console.log(`Logger running at http://localhost:${PORT}`);
});
