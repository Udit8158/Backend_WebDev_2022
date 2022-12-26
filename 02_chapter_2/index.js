const fsPromise = require('fs/promises');
const fs = require('fs')
const path = require('path');

// // Reading file 
// fs.readFile(path.join(__dirname, 'first.txt'), 'utf-8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return
//     }

//     console.log(data);
// })

// // write file ==> it overrite file
// const content = 'Hello I am Udit'
// fs.writeFile(path.join(__dirname, 'second.txt'), content,  (err) => {
//     if (err) {
//         console.error(err);
//         return
//     }
//     console.log('Completed writing')
// })

// // append file => it append content
// const appendContent = '\n\nNew append content'
// fs.appendFile(path.join(__dirname, 'third.txt'), appendContent, (err) => {
//     if (err) console.log(err)
//     console.log('complete appened')
// })

const fileOps = async () => {
    try {
        // read the file
        const data = await fsPromise.readFile(path.join(__dirname, 'first.txt'), 'utf8');
        console.log(data);
        await fsPromise.unlink(path.join(__dirname, 'first.txt'));

        // write file 
        const content = data;
        await fsPromise.writeFile(path.join(__dirname, 'new_file.txt'), content);
        await fsPromise.appendFile(path.join(__dirname, 'new_file.txt'), '\nNew Content');
        await fsPromise.rename(path.join(__dirname, 'new_file.txt'), path.join(__dirname, 'done.txt'));
        const newData = await fsPromise.readFile(path.join(__dirname, 'done.txt'), 'utf8');
        console.log(newData);

    } catch (err) {
        console.error(err);
                return
    }
}

// fileOps()
console.log(fs.existsSync(path.join(__dirname, 'done.txt')))



const makeDir = async() => {
    try {
        if (!fs.existsSync(path.join(__dirname,'new_dir'))) {

            await fsPromise.mkdir(path.join(__dirname, 'new_dir'))
        } else {
            fsPromise.rmdir(path.join(__dirname, 'new_dir'));
        }

    }catch(err) {
        console.log(err)
    }
}

makeDir()