export const parseArgs = () => {
    var startArgumants = {}

    for (const index in process.argv) {
        const arg = process.argv[index]

        if (arg.startsWith('--')) {
            const split = arg.split('=')
            if (split.length == 2) {
                startArgumants[split[0].slice(2)] = split[1]
            }
        }
    }

    if (startArgumants.username == undefined) {
        startArgumants.username = 'rickroll'
    }

    return startArgumants
}