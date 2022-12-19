export function success(answer = '') {
    if (answer != '') {
        answer += '\n'
    }
    return {
        result: 'success',
        answer: answer
    }
}

export function error(reason) {
    return {
        result: 'error',
        reason: 'Operation failed:\n\t' + reason + '\n'
    }
}

export function exit() {
    return {
        result: 'exit'
    }
}