import { parsePath } from "../../file/parsePath.js"
import { success, error } from "../result.js"
import { cp } from 'fs/promises'

export async function executeCp(context, from, to) {
    const fromFile = parsePath(context, from)
    const toFile = parsePath(context, to)

    try {
        await cp(
            fromFile,
            toFile,
            { recursive: true, errorOnExist: true, force: false }
        )
        return success('')
    } catch {
        return error('copy error from: ' + from + ' to:' + to)
    }
}