const {v4: uuid} = require('uuid');
const {format} = require('date-fns')

const id = uuid();
console.log(id);

const date = new Date()
console.log(format(date,'dd-MM-yyyy'));