require('dotenv').config()

const Server = require('./server/server')
const MongoDB = require('./server/mongo')

MongoDB.connect()

// ORDER OF THE FUNCTIONS IS IMPORTANT
//
Server.configure()
Server.enableRequestLogs()
Server.enableErrorLogs()
Server.enableV1Routes()
Server.connect()