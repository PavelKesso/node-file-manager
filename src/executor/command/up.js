import path from 'path'
import { success } from '../result.js'

export function executeUp(context) {
    context.dir = path.parse(context.dir).dir
    return success('')
}