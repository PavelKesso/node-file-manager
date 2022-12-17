import { ParametersError, UncnowkCommandError } from "./errors.js"

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

export const Cat = {
    command: 'cat',
    params: [
        {
            name: 'path'
        },
    ]
}

export const Add = {
    command: 'add',
    params: [
        {
            name: 'path'
        },
    ]
}

export const Rn = {
    command: 'rn',
    params: [
        {
            name: 'from'
        },
        {
            name: 'to'
        },
    ]
}

export const Cp = {
    command: 'cp',
    params: [
        {
            name: 'from'
        },
        {
            name: 'to'
        },
    ]
}

export const Mv = {
    command: 'mv',
    params: [
        {
            name: 'from'
        },
        {
            name: 'to'
        },
    ]
}

export const Rm = {
    command: 'rm',
    params: [
        {
            name: 'path'
        },
    ]
}

export const Os = {
    command: 'os',
    params: [
        {
            name: 'parameter'
        },
    ]
}

export const Hash = {
    command: 'hash',
    params: [
        {
            name: 'path'
        },
    ]
}

export const Compress = {
    command: 'compress',
    params: [
        {
            name: 'from'
        },
        {
            name: 'to'
        },
    ]
}

export const Decompress = {
    command: 'decompress',
    params: [
        {
            name: 'from'
        },
        {
            name: 'to'
        },
    ]
}

export const Exit = {
    command: '.exit',
    params: []
}

const commands = [Up, Cd, Ls, Cat, Add, Rn, Cp, Mv, Rm, Os, Hash, Compress,
    Decompress, Exit]

export const parseCommand = (rawCommand) => {
    try {
        const commandName = rawCommand.trim().split(/\s+/)[0]

        const command = commands.find(element =>
            element.command == commandName
        )

        if (command == undefined) {
            throw new UncnowkCommandError(rawCommand)
        }

        return command
    } catch {
        throw new UncnowkCommandError(rawCommand)
    }
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