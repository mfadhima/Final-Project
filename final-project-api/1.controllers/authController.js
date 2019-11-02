const db = require('../database/index')
const nodeMailer = require('nodemailer')

let transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'mfadhima@gmail.com',
        pass : 'uvjlwluuexstvqhz'
    },
    tls : {
        rejectUnauthorized : false
    }
})

module.exports = {
    checkUser : (req, res) => {
        db.query(`select * from users`, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch (err) {
                console.log(err)
            }
        })
    },

    register : (req, res) => {
        let sql = `select * from users where email = '${req.body.email}'`
        let sql2 = `insert into users value (0, '${req.body.firstName}','${req.body.lastName}',
                    '${req.body.email}', '${req.body.password}', 'user', 0)`
        
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                if(result.length > 0) {
                    res.send({
                        status: '400',
                        message: 'Email has been used!'
                    })
                } else {
                    db.query(sql2, (err2, result2) => {
                        try {
                            if(err2) throw err2
                            res.send({
                                status: '201',
                                message: 'Your account has been created!'
                            })
                        } catch (err2) {
                            console.log(err2)
                        }
                    })
                }
            } catch (err) {
                console.log(err)
            }
        })
    }
}