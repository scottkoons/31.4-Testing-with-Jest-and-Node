/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const { MarkovMachine } = require("./markov");
const process = require("process");
const axios = require("axios");

const makeText = (path) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
};

const generateText = (text) => {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
};

const generateTextUrl = async (url) => {
    let res;
    try {
        res = await axios.get(url);
    } catch {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
};

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    generateTextUrl(path);
} else {
    console.error(`Not a valid method:${method}`);
    process.exit(1);
}