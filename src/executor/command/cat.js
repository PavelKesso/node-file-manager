import { success, error } from "../result.js"
import { readFile } from 'fs/promises'
import { parsePath } from '../../file/parsePath.js'

export async function executeCat(context, fileName) {
    const fileToRead = parsePath(context, fileName)

    try {
        const content = await readFile(fileToRead, { encoding: 'utf-8' })
        return success(content)
    } catch {
        return error('cat: ' + fileName + ': no such file or directory')
    }
}