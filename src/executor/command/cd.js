import path from 'path'
import { isFileExist } from '../../file/isFileExist.js'
import { success, error } from '../result.js'
import { parsePath } from '../../file/parsePath.js'

export async function executeCd(context, destenation) {
    const pathToCd = parsePath(context, destenation)

    if (await isFileExist(pathToCd)) {
        context.dir = pathToCd
        return success()
    } else {
        return error('cd: ' + destenation + ': No such file or directory')
    }
}
