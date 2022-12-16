import { Transform } from 'node:stream'
import { brotliCompress, brotliDecompress } from 'node:zlib'

class BrotliTransformerZip extends Transform {


    async _transform(chunk, encoding, callback) {
        brotliCompress(chunk, (err, buffer) => {
            callback(null, buffer)
        })
    }
}

class BrotliTransformerUnzip extends Transform {


    async _transform(chunk, encoding, callback) {
        brotliDecompress(chunk, (err, buffer) => {
            callback(null, buffer)
        })
    }
}

export const createBrodliZip = () => new BrotliTransformerZip()
export const createBrodliUnzip = () => new BrotliTransformerUnzip()