import { Mv, Cp, Rn, Add, Cat, Cd, Ls, Up } from "../commands.js"
import { UncnowkCommandError } from "../errors.js"
import { executeUp } from './command/up.js'
import { executeCd } from './command/cd.js'
import { executeLs } from './command/ls.js'
import { executeCat } from './command/cat.js'
import { executeAdd } from './command/add.js'
import { executeRn } from './command/rn.js'
import { executeCp } from "./command/cp.js"
import { executeMv } from "./command/mv.js"

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
                const catFileName = parameters.path
                commandResult = await executeCat(this.context, catFileName)
                break
            case Add:
                const addFileName = parameters.path
                commandResult = await executeAdd(this.context, addFileName)
                break
            case Rn:
                const rnFrom = parameters.from
                const rnTo = parameters.to
                commandResult = await executeRn(this.context, rnFrom, rnTo)
                break
            case Cp: 
                const cpFrom = parameters.from
                const cpTo = parameters.to
                commandResult = await executeCp(this.context, cpFrom, cpTo)
                break
            case Mv: 
                const mvFrom = parameters.from
                const mvTo = parameters.to
                commandResult = await executeMv(this.context, mvFrom, mvTo)
                break
            default:
                throw new UncnowkCommandError(command.command)
                break
        }

        return commandResult
    }
}