import path from 'path'
import { readdir, lstat } from 'fs/promises'
import { success } from '../result.js'
import { Transform } from 'stream'
import { Console } from 'console'

export async function executeLs(context) {
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })

    const files = await readdir(context.dir)
    const tablePromises = files.map(file => {
        return lstat(path.normalize(path.join(context.dir, file)))
            .then(stat => {
                const type = stat.isFile() ? 'file' : 'folder'
                return {
                    Name: file,
                    Type: type
                }
            })
    })

    const table = await Promise.all(tablePromises)

    logger.table(table)
    const tableStrng = (ts.read() || '').toString()
    return success(tableStrng)
}