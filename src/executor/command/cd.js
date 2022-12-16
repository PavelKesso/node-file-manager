import path from 'path'
import { isFileExist } from '../../file/isFileExist.js'
import { success, error } from '../result.js'

export async function executeCd(context, destenation) {
    if (path.isAbsolute(destenation)) {
        if (await isFileExist(destenation)) {
            context.dir = destenation
            return success('')
        } else {
            return error('no such dir: ' + destenation)
        }
    }
    else {
        let newPath = path.normalize(path.join(context.dir, destenation))
        if (await isFileExist(newPath)) {
            context.dir = newPath
            return success('')
        } else {
            return error('no such dir: ' + destenation)
        }
    }
}
