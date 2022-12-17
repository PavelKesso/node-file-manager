import { success, error } from "../result.js";

export function executeOs(context, parameter) {
    var answer = ''
    switch(parameter) {
        case '--EOL':
            answer = context.eol
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