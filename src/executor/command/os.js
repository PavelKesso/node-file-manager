import { success, error } from "../result.js";

export function executeOs(context, parameter) {
    var answer = ''
    switch (parameter) {
        case '--EOL':
            switch (context.eol) {
                case '\n':
                    answer = '\\n'
                    break
                case '\r\n':
                    answer = '\\r\\n'
                    break
                default:
                    answer = 'https://www.youtube.com/watch?v=eBGIQ7ZuuiU'
                    break
            }
            break
        case '--cpus':
            answer = context.cpuCount
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