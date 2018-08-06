
import fs from 'fs'
import { uniq } from 'lodash'
import csv from 'csv-parser'

/*
    CLASS: Reader -- reads and parses files from the filesystem
*/
class Reader {
    constructor(filePath = 'addresses.csv') {
        // this.filePath = path.join(__dirname, filePath)
        this.filePath = filePath
    }
    read() {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(this.filePath)
            let data = []
            readStream.pipe(csv())
            .on('data', (chunk) => {
                data = data.concat(chunk.Address)
            }).on('error', (er) => {
                reject(er)
            }).on('end', () => {
                this.data = uniq(data)
                this.data = this.data.map((d) => { return d && d !== '' && d.replace(/[\u201c\u201d]/g, '')})
                resolve(this.data)
            })
        })
    }
}

export default Reader
