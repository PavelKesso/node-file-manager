import { Transform } from 'node:stream'
import { parseCommand, parseParams } from './commands.js'

class FileManager extends Transform {
    constructor(startArgumants, context) {
        super()
        this.startArgumants = startArgumants
        this.context = context
        console.log("Welcome to the File Manager, %s!", startArgumants.username);
        console.log(getCurrentDir(this.context))
    }

    _transform(chunk, encoding, callback) {
        const currentDir = getCurrentDir(this.context)

        const rawCommand = chunk.toString()
        const command = parseCommand(rawCommand)
        const commandParams = parseParams(command, rawCommand)

        console.log(commandParams);

        callback(null, currentDir + '\n')
    }
}

function getCurrentDir(context) {
    return 'You are currently in ' + context.dir
}

export const createFileManager = (startArgumants, context) => {
    return new FileManager(startArgumants, context)
}
