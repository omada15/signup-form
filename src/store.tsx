const write = (key: string, val: any) => {
    let data = read("");
    data[key] = val
    localStorage.setItem("data", JSON.stringify(data))
}

function read(key: string): any {
    if (!key) {
        return JSON.parse(localStorage.getItem("data") ?? "{value: 'empty'}")
    } else {
        return JSON.parse(localStorage.getItem("data") ?? "{value: 'empty'}")[key];
    }
}

export { write, read }