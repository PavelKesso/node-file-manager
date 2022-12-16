import path from 'path'
import { isFileExist } from '../../file/isFileExist.js';
import { success, error } from "../result.js";
import { readFile } from 'fs/promises'

export async function executeCat(context, fileName) {
    const fileToRead = path.isAbsolute(fileName)
        ? fileName
        : path.normalize(path.join(context.dir, fileName))

    if (await isFileExist(fileToRead)) {
        const content = await readFile(fileToRead,{ encoding: 'utf-8' })
        return success(content + '\n')
    } else {
        return error('no such file: ' + fileName)
    }
}