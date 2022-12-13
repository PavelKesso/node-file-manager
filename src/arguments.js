export const parseArgs = () => {
    var startArgumants = {}

    for (const index in process.argv) {
        const arg = process.argv[index]

        if (arg.startsWith('--')) {
            startArgumants[arg.slice(2)] = process.argv[parseInt(index) + 1]
        }
    }

    return startArgumants
}