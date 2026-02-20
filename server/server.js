import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const dbcred = {
    apiKey: "AIzaSyBd3bwXEyu2_baGOTmHCE7XdklLC2XQvLQ",
    authDomain: "frc-scouting-example.firebaseapp.com",
    databaseURL: "https://frc-scouting-example-default-rtdb.firebaseio.com",
    projectId: "frc-scouting-example",
    storageBucket: "frc-scouting-example.firebasestorage.app",
    messagingSenderId: "751751296552",
    appId: "1:751751296552:web:37fd4cc9904a16b20de71d",
};

const fb = initializeApp(dbcred);
const db = getDatabase(fb);

async function read(path) {
    try {
        const snapshot = await get(child(ref(db), path));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data found at:", path);
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function write(path, data) {
    try {
        console.log(data);
        await set(ref(db, path), data);
    } catch (error) {
        throw error;
    }
}

const app = express();
const PORT = 3001;

app.use(
    cors({
        origin: ["https://signin3464.vercel.app", "http://localhost:5173"],
        methods: ["POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());

let router = express.Router();

// Ensure logs folder exists
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

router.post("/log", (req, res) => {
    console.log(req.body.message);
    res.status(200).send({ message: "logged" });
});

router.post("/in", async (req, res) => {
    const name = req.body.id;
    let data = await read("root");
    if (data[name]) {
        if (!data[name].in) {
            data[name].in = true;
            data[name].startTime = parseFloat((Date.now() / 60000).toFixed(2));
        } else {
            console.log("User signed in");
            res.status(500).json({ error: "signed in" });
        }
    } else {
        console.log("Non existent user");
        res.status(500).json({ error: "you dont exist" });
    }
    write("root", data);
    console.log(`SIGN IN USER ${name}`);
});

router.post("/new", async (req, res) => {
    const name = req.body.id;
    let data = await read("root");
    if (data[name]) {
        res.status(500).json({ error: "you exist" });
    } else {
        data[name] = {
            id: name,
            totalMinutes: 0,
            in: false,
            startTime: 0,
        };
    }
    write("root", data);
});

router.post("/out", async (req, res) => {
    const name = req.body.id;
    let data = await read("root");

    if (!data[name]) {
        res.status(500).json({ error: "you dont exist" });
    } else {
        if (!data[name].in) {
            res.status(500).json({ error: "youre not signed in" });
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
    write("root", data);
    console.log(`SIGN OUT USER ${name}`);
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Logger running at http://localhost:${PORT}`);
});
