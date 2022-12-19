import { success, error } from "../result.js"
import { cpus } from 'node:os'
import { Transform } from 'stream'
import { Console } from 'console'
import { inspect } from 'util'

export function executeOs(context, parameter) {
    var answer = ''
    switch (parameter) {
        case '--EOL':
            switch (context.eol) {
                case '\n':
                    answer = '\\n'
                    break
                case '\n\r':
                    answer = '\\n\\r'
                    break
                default:
                    answer = 'https://www.youtube.com/watch?v=eBGIQ7ZuuiU'
                    break
            }
            break
        case '--cpus':
            let total = 'Total: ' + context.cpuCount + '\n'
            const table = getCpuTable()
            answer = total + table
            break
        case '--homedir':
            answer = context.home
            break
        case '--username':
            answer = context.userName
            break
        case '--architecture':
            answer = context.architecture
            break
        default:
            return error('os: ' + parameter + ':  Uncknown parameter')
            break
    }

    return success(answer)
}

function getCpuTable() {
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })

    const cpuList = cpus().map(cpu => {
        const clockRate =
            (Math.round((cpu.speed * 0.001 + Number.EPSILON) * 1000) / 1000)
            + ' GHz'
        return {
            'Model': cpu.model,
            'Clock Rate': clockRate
        }
    })

    logger.table(cpuList)
    return (ts.read() || '').toString()
}