import fs from 'fs/promises'

class Csv {
    csvdata(finalData) {
        let csv = ''
        let keys = Object.keys(finalData)
        csv += keys.join(',') + '\n';
        let values = Object.values(finalData)
        csv += values.join(',') + `\n`

        return csv


    }

    async csvreportGenerator(data) {

        try {
            await fs.writeFile('report.csv', data)

        }
        catch (e) {
            console.log(e)
        }

    }

}

export default new Csv()

