const mySql = require('mysql')

const db = mySql.createConnection(
    {
        user: 'root',
        password: 'password',
        host: 'localhost',
        database: 'final_project'
    }
)

module.exports = db