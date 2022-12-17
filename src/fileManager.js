import { Transform } from 'node:stream'
import { CommandExecutor } from './executor/commandExecutor.js'
import { parseCommand, parseParams } from './commands.js'
import { currentDir, parting } from './greetings.js'
import { ParametersError, UncnowkCommandError } from './errors.js'

class FileManager extends Transform {
    constructor(startArgumants, context) {
        super()
        this.startArgumants = startArgumants
        this.context = context
        this.executor = new CommandExecutor(context)
    }

    async _transform(chunk, encoding, callback) {
        try {
            const rawCommand = chunk.toString()
            const command = parseCommand(rawCommand)
            const commandParams = parseParams(command, rawCommand)

            const answer = await this.executor.executeCommand(command, commandParams)
            var commandResult = ''

            switch (answer.result) {
                case 'success':
                    commandResult = answer.answer
                    break
                case 'error':
                    commandResult = answer.reason
                    break
                case 'exit':
                    callback(null, parting(this.startArgumants))
                    process.exit()
                    break
                default:
                    break
            }

            const dir = currentDir(this.context)
            callback(null, commandResult + dir)
        } catch (e) {
            var errorMessage = ''
            if (e instanceof UncnowkCommandError) {
                errorMessage = 'Invalid input:\n\tunknown command: ' + e.commandName
            }
            if (e instanceof ParametersError) {
                errorMessage = 'Invalid input:\n\twrong parameters number:'
                    + '\n\t\texected count = ' + e.command.params.length 
                    + '\n\t\tactural count = ' + e.parameters.length + '\n'
            }

            const dir = currentDir(this.context)
            callback(null, errorMessage + dir)
        }
    }
}

export const createFileManager = (startArgumants, context) => {
    return new FileManager(startArgumants, context)
}
