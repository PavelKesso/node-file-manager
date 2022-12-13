import { ParametersError } from "./errors.js"

export const Up = {
    command: "up",
    params: []
}

export const Cd = {
    command: 'cd',
    params: [
        {
            name: 'path'
        },
    ]
}

export const Ls = {
    command: 'ls',
    params: []
}

export const commands = [Up, Cd, Ls]

export const parseCommand = (rawCommand) => {
    const commandName = rawCommand.trim().split(/\s+/)[0]

    const command = commands.find(element =>
        element.command == commandName
    )

    return command
}

export const parseParams = (command, rawCommand) => {
    const rawParamsRegExp =
        new RegExp('\\s*' + command.command + '\\s*(.*)')
    const nextParamRegExp = 
        new RegExp('\\s*(\".*?\"|\'.*?\'|\\S*)\\s*(.*)')

    const rawParams = rawParamsRegExp.exec(rawCommand)[1]
    var params = rawParams.match(new RegExp('\".*?\"|\'.*?\'|\\S+', "g"))
    params = params == null ? [] : params

    if (params.length != command.params.length) {
        throw new ParametersError(command, params)
    } 

    const answer = {}
    command.params.forEach((element, index) => {
        answer[element.name] = params[index]
    })
    
    return answer
}