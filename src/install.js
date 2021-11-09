const {type} = require("os");
const {join} = require("path");
const fetch = require("node-fetch");
const fs = require("fs").promises;

function install() {
    const version = "0.37.0";

    const os = type().toLowerCase();

    let platform = "linux";


    if (os.includes("windows")) {
        platform = "windows";
    } else if (os.includes("darwin")) {
        platform = "darwin";
    }

    const ext =  platform === "windows" ? ".exe" : "";
    const arch = process.arch.includes("arm") ? "arm" : "amd64";
    const url = releaseFor(version, platform, arch) + ext;
    const cli = join("bin", "ytt-cli" + ext);

    return fetch(url, {
        method: 'GET'
    }).then(res => res.buffer()).then(buffer => {
        return fs.writeFile(cli, buffer)
    }).then(() => {
        return fs.chmod(cli, 0o755);
    });
}

function releaseFor(version, platform, arch) {
    return `https://github.com/vmware-tanzu/carvel-ytt/releases/download/v${version}/ytt-${platform}-${arch}`;
}

install()
