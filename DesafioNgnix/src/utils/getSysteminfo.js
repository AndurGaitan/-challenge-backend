import os from 'os'

export function getSystemInfo() {
    return {
        args: JSON.stringify(process.argv.slice(2)),
        os: process.platform,
        node: process.version,
        memoryUsed: process.memoryUsage().rss,
        execPath: process.execPath,
        processID: process.pid,
        folder: process.cwd(),
        processors: os.cpus().length
    };
}