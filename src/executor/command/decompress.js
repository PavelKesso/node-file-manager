import { success, error } from "../result.js"
import { parsePath } from "../../file/parsePath.js"
import { createReadStream, createWriteStream } from 'fs'
import { createBrodliUnzip } from "../../brotli/brotli.js"
import { isFileExist } from "../../file/isFileExist.js"

export async function executeDecompress(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    if (!await isFileExist(fromFile)) {
        return error('decompress: ' + from + ': No such file or directory')
    }
    if (await isFileExist(toFile)) {
        return error('decompress: ' + to + ': File already exist')
    }

    const brodliUnzip = createBrodliUnzip()
    const readSteam = createReadStream(fromFile)
    const writeStream = createWriteStream(toFile)

    readSteam.pipe(brodliUnzip).pipe(writeStream)

    return success()
}