export class ParametersError extends Error {
    constructor (command, parameters) {
        super(command + parameters)
        this.command = command
        this.parameters = parameters
    }
}

export class UncnowkCommandError extends Error {
    constructor(commandName) {
        super(commandName)
        this.commandName = commandName
    }
}