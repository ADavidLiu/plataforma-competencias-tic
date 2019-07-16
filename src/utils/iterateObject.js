function iterateObject(obj) {
    Object.keys(obj).forEach(key => {
        console.log(`key: ${key}, value: ${obj[key]}`);
        if (typeof obj[key] === "object") {
            iterate(obj[key])
        }
    });
}

export default iterateObject;