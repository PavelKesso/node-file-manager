import { parsePath } from "../../file/parsePath.js"
import { success, error } from "../result.js"
import { rename } from 'fs/promises'

export async function executeRn(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    try {
        await rename(fromFile, toFile)
        return success('')
    } catch {
        return error('copy error from: ' + from + ' to: ' + to)
    }

}