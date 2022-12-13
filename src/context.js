import path from 'path'
import { fileURLToPath } from 'url'
import { cpus, EOL, homedir, userInfo, arch } from 'node:os'

export const getContext = () => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    return {
        dir: __dirname,
        cpuCount: cpus().length,
        eol: EOL,
        home: homedir(),
        userName: userInfo().username,
        architecture: arch()
    }
}