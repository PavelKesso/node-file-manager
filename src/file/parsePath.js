import path from 'path'

export function parsePath(context, pathToFile) {
    return path.isAbsolute(pathToFile)
        ? pathToFile
        : path.normalize(path.join(context.dir, pathToFile))
}