import path from 'path'
import { Cd, Ls, Up } from "./commands.js"
import { UncnowkCommandError } from "./errors.js"
import { access } from 'fs/promises'

export class CommandExecutor {
    constructor(context) {
        this.context = context
    }

    async executeCommand(command, parameters) {
        var commandResult = {}

        switch (command.command) {
            case Up.command:
                commandResult = executeUp(this.context)
                break
            case Cd.command:
                const destination = parameters.path
                commandResult = await execureCd(this.context, destination)
                break
            case Ls.command:
                break
            default:
                throw new UncnowkCommandError(command.command)
                break
        }

        return commandResult
    }
}

async function isFileExist(name) {
    try {
        await access(name)
        return true
    } catch {
        return false
    }
}

function success(answer) {
    return {
        result: 'success',
        answer: answer
    }
}

function error(reason) {
    return {
        result: 'error',
        reason: reason
    }
}

function executeUp(context) {
    context.dir = path.parse(context.dir).dir
    return success('')
}

async function execureCd(context, destenation) {
      if (path.isAbsolute(destenation)) {
        if (await isFileExist(destenation)) {
            context.dir = destenation
            return success('')
        } else {
            return error('no such dir: ' + destenation)
        }      
    }
    else {
        let newPath = path.normalize(path.join(context.dir, destenation));
        if (await isFileExist(newPath)) {
            context.dir = newPath
            return success('')
        } else {
            return error('no such dir: ' + destenation)
        }      
    }
}