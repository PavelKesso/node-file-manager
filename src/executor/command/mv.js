import { parsePath } from "../../file/parsePath.js"
import { success, error } from "../result.js"
import { createReadStream, createWriteStream } from 'fs'
import { isFileExist } from "../../file/isFileExist.js"
import { rm, lstat } from "fs/promises"

export async function executeMv(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    if (!await isFileExist(fromFile)) {
        return error('mv: ' + from + ':  No such file or directory')
    }
    if (!await isFileExist(toFile)) {
        return error('mv: ' + to + ':  no such file or directory')
    }
    const stat = await lstat(toFile)
    if (!stat.isDirectory) {
        return error('mv: ' + to + ':  Is not folder')
    }

    const readStream = createReadStream(fromFile)
    const writeStream = createWriteStream(toFile)

    readStream.pipe(writeStream).on('close', async () => {
        await rm(fromFile)
    })

    return success()
}