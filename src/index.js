const shell = require("shelljs");
const {join} = require("path");
const os = require("os");

const ext =  os.type().includes("Windows") ? ".exe" : "";
module.exports = {
    ytt: {
        exec(cmd, options = {silent: true}) {
            const exec = `${join(__dirname,"..", "bin", "ytt-cli") + ext} ${cmd}`;
            const result = shell.exec(exec, options);

            if (result.code !== 0) {
                throw `exit code ${result.code} | ${exec}`
            }

            return (options && options.full)
                ? result
                : result.stdout;
        }
    }
}
