const {v4: uuid} = require('uuid');
const {format} = require('date-fns')


const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const logEvent = async(msg) => {
    try {

        const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
        const id = uuid()
        
        const fileContent = `${date} \t${id} \t${msg} \n`;
    
        if (!fs.existsSync(path.join(__dirname, 'log'))) await fsPromise.mkdir(path.join(__dirname, 'log'));
    
        await fsPromise.appendFile(path.join(__dirname, 'log', 'logs.txt'), fileContent)

        console.log('Operation successful');
    } catch(err) {
        console.error(err)
    }

}

module.exports = {
    logEvent,}