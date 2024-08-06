
const MAX_LEN = 5;

export function generate() {
    let ans = "";
    const subset = "zxcvbnmalsjdhfgqwertyuiop1029387465!@$$^&*";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
console.log(generate)
