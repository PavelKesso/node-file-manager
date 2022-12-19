import { success, error } from "../result.js"
import { parsePath } from "../../file/parsePath.js"
import { createReadStream, createWriteStream } from 'fs'
import { createBrodliZip } from "../../brotli/brotli.js"
import { isFileExist } from "../../file/isFileExist.js"

export async function executeCompress(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    if (!await isFileExist(fromFile)) {
        return error('compress: ' + from + ': No such file or directory')
    }
    if (await isFileExist(toFile)) {
        return error('compress: ' + to + ': File already exist')
    }
    
    const brodliZip = createBrodliZip()
    const readSteam = createReadStream(fromFile)
    const writeStream = createWriteStream(toFile)

    readSteam.pipe(brodliZip).pipe(writeStream)

    return success()
}