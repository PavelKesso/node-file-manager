export function success(answer) {
    return {
        result: 'success',
        answer: answer
    }
}

export function error(reason) {
    return {
        result: 'error',
        reason: reason
    }
}
