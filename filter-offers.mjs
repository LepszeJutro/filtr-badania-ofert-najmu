import {cities, io} from "./util.mjs";
import CLASSIFICATION_MAP from "./classifier.mjs";

const loadCsvFile = (city) => {
    const file = `./data/input/${city}.csv`;
    return fs.readFileSync(file).toString();
}

const classifiers = Object.entries(CLASSIFICATION_MAP);
const stats = {};
const resultCsv = "./data/results/offers.csv";
for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    if (!stats[city]) {
        stats[city] = {};
    }
    const fileContent = loadCsvFile(city);
    const rows = fileContent.split("\n");
    let headerRow = rows.shift();
    if (headerRow.length === 0) {
        headerRow = rows.shift();
    }
    const headers = headerRow.split(";");
    const newHeaders = ["Miasto", ...headers, ...classifiers.map(([l]) => l), "Metraż"];
    if (i === 0) {
        await $`echo ${newHeaders.join(";")} > ${resultCsv}`.quiet()
    }
    const descriptionIndex = headers.findIndex((c) => c.toLowerCase() === "opis");
    const additionalInfoIndex = headers.findIndex((h) => h.toLowerCase() === "dodatkowe dane");
    const matches = [];
    rows.forEach((r) => {
        const cols = r.split(";");
        const desc = cols[descriptionIndex];
        if (!desc || desc.length === 0) {
            return;
        }
        const labelPositions = {};
        const newCols = [city, ...cols.map((c) => c.replace(";", "}")), ...classifiers.map(([l], i) => {
            labelPositions[l] = i + cols.length + 1;
            return 0;
        })];
        let includeInResults = false;
        classifiers.forEach(([label, matchers]) => {
            if (!stats[city][label]) {
                stats[city][label] = 0;
            }
            matchers.forEach((m) => {
                if (m.test(desc)) {
                    stats[city][label] = stats[city][label] ? stats[city][label] + 1 : 1;
                    newCols[labelPositions[label]] = 1;
                    includeInResults = true;
                }
            });
        });
        const additionalInfo = cols[additionalInfoIndex];
        if (additionalInfo?.includes("Powierzchnia")) {
            const infoToParse = additionalInfo.split(",").filter((s) => s.includes("Powierzchnia"))[0];
            if (infoToParse) {
                const areaInM2 = parseInt(infoToParse.replace("Powierzchnia:", "").replace("m²", "").trim(), 10);
                if (areaInM2 !== NaN) {
                    includeInResults = true;
                    newCols.push(areaInM2);
                }
            }
        }
        if (includeInResults) {
            matches.push(newCols);
        }
    });
    await $`echo ${matches.map((m) => m.join(";")).join("\n")} >> ${resultCsv}`.quiet()
    const statsPerc = Object.entries(stats[city]).map(([l, n]) => [l, (n / rows.length) * 100]);
    statsPerc.forEach(([l, p]) => {
        stats[city][`% ${l}`] = Math.round(p * 100) / 100;
    });
    stats[city]["# ofert"] = rows.length;
}
const now = new Date();
const updatedAtString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} at ${now.toLocaleTimeString()}`;
await $`echo ${updatedAtString} > ./data/results/updated-at.txt`.quiet()
io.write.info(stats);
const statsCsv = "./data/results/stats.csv";
const statsCities = Object.keys(stats);
const statsHeaders = ["Miasto", ...Object.keys(stats[statsCities[0]])];
await $`echo ${statsHeaders.join(";")} > ${statsCsv}`.quiet()
for (let i = 0; i < statsCities.length; i++) {
    const statCity = statsCities[i];
    const stat = [statCity, ...Object.values(stats[statCity])];
    await $`echo ${stat.join(";")} >> ${statsCsv}`.quiet()
}