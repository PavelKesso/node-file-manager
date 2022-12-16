import { success, error } from "../result.js"
import { writeFile } from 'fs/promises'
import { parsePath } from "../../file/parsePath.js";

export async function executeAdd(context, fileName) {
    const fileToCreate = parsePath(context, fileName)

    try {
        await writeFile(fileToCreate, '', { flag: 'wx' })
        return success('')
    } catch {
        return error('error during file creation: ' + fileName)
    }
}