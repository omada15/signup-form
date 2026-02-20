import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { readMain, updateMain } from "./json.js";

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

let router = express.Router();

// Ensure logs folder exists
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

function logg(level, message) {
    const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
    });
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error("Failed to write log:", err);
            return res.status(500).send("Log failed");
        }
    });
}

const logFile = path.join(logsDir, "app.log");

router.post("/log", (req, res) => {
    const { level = "INFO", message } = req.body;
    logg(level, message);
});

router.post("/in", async (req, res) => {
    const name = req.body.id;
    let data = readMain();
    if (data[name]) {
        if (!data[name].in) {
            data[name].in = true;
            data[name].startTime = parseFloat((Date.now() / 60000).toFixed(2));
        } else {
            res.json({ error: "signed in" });
        }
    } else {
        res.json({ error: "you dont exist" });
    }
    updateMain(data);
    logg("INFO", `SIGN IN USER ${name}`);
});

router.post("/new", async (req, res) => {
    console.log(req.body);
    const name = req.body.id;
    let data = readMain();
    if (data[name]) {
        res.json({ error: "you exist" });
    } else {
        data[name] = {
            id: name,
            totalMinutes: 0,
            in: false,
            startTime: 0,
        };
    }
    updateMain(data);
});

router.post("/out", (req, res) => {
    const name = req.body.id;
    let data = readMain();
    if (!data[name]) {
        res.json({ error: "you dont exist" });
    } else {
        if (!data[name].in) {
            res.json({ error: "youre not signed in" });
        } else {
            let time = parseFloat((Date.now() / 60000).toFixed(2));
            let curr = parseFloat(
                (
                    parseFloat(data[name].totalMinutes) +
                    parseFloat((time - data[name].startTime).toFixed(2))
                ).toFixed(2),
            );
            data[name].totalMinutes = curr;
            data[name].in = false;
        }
    }
    updateMain(data);
    logg("INFO", `SIGN OUT USER ${name}`);
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Logger running at http://localhost:${PORT}`);
});
