import { createFileManager } from "./fileManager.js"
import { parseArgs } from "./arguments.js"
import { getContext } from "./context.js"
import { currentDir, greatings, parting } from "./greetings.js"

const app = () => {
    const startArguments = parseArgs()
    const context = getContext()
    const fileManager = createFileManager(startArguments, context)

    process.on('SIGINT', function () {
        process.stdout.write(parting(startArguments))
        process.exit();
    })

    process.stdin
        .pipe(fileManager)
        .pipe(process.stdout)

    process.stdout.write(greatings(startArguments))
    process.stdout.write(currentDir(context))
}

app()