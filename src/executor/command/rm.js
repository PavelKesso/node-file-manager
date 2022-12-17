import { rm } from 'fs/promises'
import { parsePath } from '../../file/parsePath.js';
import { success, error } from "../result.js";

export async function executeRm(context, fileName) {
    const fileToRemove = parsePath(context, fileName)

    try {
        await rm(fileToRemove)
        return success()
    } catch {
        return error('rm: ' + fileName + ': No such file or directory')
    }
}