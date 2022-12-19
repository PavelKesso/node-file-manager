import { parsePath } from "../../file/parsePath.js"
import { success, error } from "../result.js"
import { readFile } from 'fs/promises'
import { createHash } from 'crypto'

export async function executeHash(context, fileName) {
    const fileToHash = parsePath(context, fileName)

    try {
        const content = await readFile(fileToHash)
        const hashSum = createHash('sha256')
        return success(hashSum.digest('hex'))
    } catch {
        return error('hash: ' + fileName + ': No such file or directory')
    }
}