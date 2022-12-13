import { createFileManager } from "./fileManager.js"
import { parseArgs } from "./arguments.js"
import { getContext } from "./context.js"

const app = () => {
    const startArguments = parseArgs()
    const context = getContext()
    const fileManager = createFileManager(startArguments, context)

    process.on('SIGINT', function () {
        console.log("\nThank you for using File Manager, %s, goodbye!",
            startArguments.username);
        process.exit();
    })


    process.stdin
        .pipe(fileManager)
        .pipe(process.stdout)
}

app()