import fs from "fs";

export function readMain() {
    try {
        const jsonString =  fs.readFileSync("data.json", "utf8");
        const data = JSON.parse(jsonString);
        return data;
    } catch (error) {
        console.error(`Error reading or parsing file: ${error}`);
        throw error;
    }
}

export function updateMain(json) {
    fs.writeFileSync("data.json", JSON.stringify(json, null, 2));
}