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
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        throw error;
    }
}

async function write(path, data) {
    try {
        await set(ref(db, path), data);
    } catch (error) {
        throw error;
    }
}

const app = express();
const PORT = 3001;

// 1. Explicitly define allowed origins
const allowedOrigins = [
    "https://signin3464.vercel.app",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

// 2. IMPORTANT: Manually handle the OPTIONS preflight globally
app.options("*", (req, res) => {
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204);
});

app.use(express.json());
// ... rest of your router and firebase code

let router = express.Router();

router.post("/log", (req, res) => {
    console.log(req.body.message);
    res.status(200).send({ message: "logged" });
});

// --- FIX 2: SEND RESPONSES ON SUCCESS ---
router.post("/in", async (req, res) => {
    const name = req.body.id;
    try {
        let data = (await read("root")) || {};
        if (data[name]) {
            if (!data[name].in) {
                data[name].in = true;
                data[name].startTime = parseFloat(
                    (Date.now() / 60000).toFixed(2),
                );
                await write("root", data);
                console.log(`SIGN IN USER ${name}`);
                return res
                    .status(200)
                    .json({ message: "Signed in", user: data[name] });
            } else {
                return res.status(400).json({ error: "Already signed in" });
            }
        } else {
            return res.status(404).json({ error: "User does not exist" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/new", async (req, res) => {
    const name = req.body.id;
    try {
        let data = (await read("root")) || {};
        if (data[name]) {
            return res.status(400).json({ error: "User already exists" });
        } else {
            data[name] = {
                id: name,
                totalMinutes: 0,
                in: false,
                startTime: 0,
            };
            await write("root", data);
            return res.status(201).json({ message: "User created" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/out", async (req, res) => {
    const name = req.body.id;
    try {
        let data = await read("root");
        if (!data || !data[name]) {
            return res.status(404).json({ error: "User does not exist" });
        }
        if (!data[name].in) {
            return res.status(400).json({ error: "User not signed in" });
        }

        let time = parseFloat((Date.now() / 60000).toFixed(2));
        let curr = parseFloat(
            (
                parseFloat(data[name].totalMinutes) +
                parseFloat((time - data[name].startTime).toFixed(2))
            ).toFixed(2),
        );
        data[name].totalMinutes = curr;
        data[name].in = false;

        await write("root", data);
        console.log(`SIGN OUT USER ${name}`);
        return res
            .status(200)
            .json({ message: "Signed out", totalMinutes: curr });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Logger running at http://localhost:${PORT}`);
});
