import { success, error } from "../result.js"
import { parsePath } from "../../file/parsePath.js"
import { createReadStream, createWriteStream } from 'fs'
import { createBrodliZip } from "../../brotli/brotli.js"
import { isFileExist } from "../../file/isFileExist.js"

export async function executeCompress(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    if (!await isFileExist(fromFile)) {
        return error('decompress error: no such file: ' + from)
    }
    if (await isFileExist(toFile)) {
        return error('decompress error: destination path are exist: ' + to)
    }
    
    const brodliZip = createBrodliZip()
    const readSteam = createReadStream(fromFile)
    const writeStream = createWriteStream(toFile)

    readSteam.pipe(brodliZip).pipe(writeStream)

    return success('')
}