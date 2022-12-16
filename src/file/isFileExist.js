import { access } from 'fs/promises'

export async function isFileExist(name) {
    try {
        await access(name)
        return true
    } catch {
        return false
    }
}