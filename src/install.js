const {type} = require("os");
const {join} = require("path");

const fs = require("fs").promises;
const fetch = require("node-fetch");

const CLI_NAME="vmware-tanzu/carvel-ytt";

install().catch(console.error);

function install() {
    const releaseQueryUrl = `https://api.github.com/repos/${CLI_NAME}/releases/latest`;

    return fetch(releaseQueryUrl, {
        method: 'GET'
    }).then(res => res.json()).then(json => {
        const version = json.tag_name;
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
        const cli = join(__dirname, "..", "bin", "ytt-cli" + ext);

        console.log(`Download ${version} for ${arch} from ${CLI_NAME} @ url ${url}`)

        return fetch(url, {
            method: 'GET'
        }).then(res => res.buffer()).then(buffer => {
            return fs.writeFile(cli, buffer)
        }).then(() => {
            return fs.chmod(cli, 0o755);
        });
    });
    
}

function releaseFor(version, platform, arch) {
    return `https://github.com/${CLI_NAME}/releases/download/${version}/ytt-${platform}-${arch}`;
}

