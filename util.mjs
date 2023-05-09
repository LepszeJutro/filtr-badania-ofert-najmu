const prettyPrint = (msg) => {
    if (typeof msg === "object") {
        return JSON.stringify(msg, null, 2);
    }
    return msg;
}

export const io = {
    write: {
        info: (msg) => console.log(chalk.blue.underline(prettyPrint(msg))),
        success: (msg) => console.log(chalk.green(prettyPrint(msg))),
        hex: (hex, msg) => console.log(chalk.hex(hex)(prettyPrint(msg)))
    }
};
// the script assumes each city has separate csv file called [city].csv
export const cities = ["example"];

export const chunkArray = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}