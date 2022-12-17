export const currentDir = (context) => {
    return 'You are currently in ' + context.dir + '\n'
}

export const greatings = (startArguments) => {
    return 'Welcome to the File Manager, ' + startArguments.username + '!\n'
}

export const parting = (startArguments) => {
    return 'Thank you for using File Manager, '
        + startArguments.username + ', goodbye!\n'
}