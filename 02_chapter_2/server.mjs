import {open, readFile} from 'node:fs/promises'
import path from 'node:path';


// for __filename and __dirname alternative in ES6
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, 'first.txt'))

const readFileNode = async (filePath) => {
  try {
   
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}

readFileNode(path.join(__dirname, 'first.txt'))