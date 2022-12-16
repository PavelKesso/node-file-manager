import path from 'path'
import { Cat, Cd, Ls, Up } from "../commands.js"
import { UncnowkCommandError } from "../errors.js"
import { executeUp } from './command/up.js'
import { executeCd } from './command/cd.js'
import { executeLs } from './command/ls.js'
import { executeCat } from './command/cat.js'


export class CommandExecutor {
    constructor(context) {
        this.context = context
    }

    async executeCommand(command, parameters) {
        var commandResult = {}


        switch (command) {
            case Up:
                commandResult = executeUp(this.context)
                break
            case Cd:
                const destination = parameters.path
                commandResult = await executeCd(this.context, destination)
                break
            case Ls:
                commandResult = await executeLs(this.context)
                break
            case Cat:
                const fileName = parameters.path
                commandResult = await executeCat(this.context, fileName)
                break
            default:
                throw new UncnowkCommandError(command.command)
                break
        }

        return commandResult
    }
}