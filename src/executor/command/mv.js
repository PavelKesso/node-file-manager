import { parsePath } from "../../file/parsePath.js"
import { success, error } from "../result.js"
import { createReadStream, createWriteStream } from 'fs'
import { isFileExist } from "../../file/isFileExist.js"
import { rm, lstat } from "fs/promises"

export async function executeMv(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    if (!await isFileExist(fromFile)) {
        return error('move error: no such file: ' + from)
    }
    if (!await isFileExist(toFile)) {
        return error('move error: destination path are not exist: ' + to)
    }
    const stat = await lstat(toFile)
    if (!stat.isDirectory) {
        return error('move error: destination should be a folder')
    }

    const readStream = createReadStream(fromFile)
    const writeStream = createWriteStream(toFile)

    readStream.pipe(writeStream).on('close', async () => {
        await rm(fromFile)
    })

    return success('')
}