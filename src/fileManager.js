import { Transform } from 'node:stream'
import { CommandExecutor } from './executor/commandExecutor.js'
import { parseCommand, parseParams } from './commands.js'

class FileManager extends Transform {
    constructor(startArgumants, context) {
        super()
        this.startArgumants = startArgumants
        this.context = context
        this.executor = new CommandExecutor(context)
        console.log("Welcome to the File Manager, %s!", startArgumants.username);
        console.log(getCurrentDir(this.context))
    }

    async _transform(chunk, encoding, callback) {

        const rawCommand = chunk.toString()
        const command = parseCommand(rawCommand)
        const commandParams = parseParams(command, rawCommand)

        const answer = await this.executor.executeCommand(command, commandParams)

        const currentDir = getCurrentDir(this.context)
        callback(null, answer.answer + currentDir + '\n')
    }
}

function getCurrentDir(context) {
    return 'You are currently in ' + context.dir
}

export const createFileManager = (startArgumants, context) => {
    return new FileManager(startArgumants, context)
}
