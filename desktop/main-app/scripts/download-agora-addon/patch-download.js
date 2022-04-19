const path = require("path");
const fs = require("fs-extra");
const { agoraElectronSdkPath } = require("../constant");
const download = require(path.join(agoraElectronSdkPath, "scripts", "download"));
const { getAgoraReleaseType } = require("../pack/utils");

const platform = process.argv[2];

if (platform === getAgoraReleaseType()) {
    // Don't download again.
    process.exit(0);
}

const electronVersion = "12.0.0";
const agoraVersion = require(path.join(agoraElectronSdkPath, "package.json")).version;

fs.removeSync(path.join(agoraElectronSdkPath, "build"));

download({
    electronVersion,
    platform: platform === "win" ? "win32" : "darwin",
    arch: platform === "win" ? "x86" : "x64",
    packageVersion: agoraVersion,
    no_symbol: false,
});