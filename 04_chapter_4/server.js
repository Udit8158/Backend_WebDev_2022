const {logEvent} = require('./logEvent')

const EventEmitter = require('events');

const eventEmitter = new EventEmitter()

eventEmitter.on('log', logEvent)

eventEmitter.emit('log')