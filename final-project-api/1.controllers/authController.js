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
    // checkUser : (req, res) => {
    //     db.query(`select * from users`, (err, result) => {
    //         try {
    //             if(err) throw err
    //             res.send(result)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })
    // },

    Login : (req, res) => {
        let sql = `select * from users where email = '${req.query.email}'`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                if(result.length > 0) {
                    if(req.query.password === result[0].password) {
                        res.send({
                            status: '200',
                            result: result[0]
                        })
                    } else {
                        res.send({
                            status: '400',
                            message: 'Incorrect email or password.'
                        })
                    }
                } else {
                    res.send({
                        status: '400',
                        message: 'Incorrect email or password.'
                    })
                }
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
                            let mailOptions = {
                                from: 'Shoes Inc',
                                to: req.body.email,
                                subject: 'Account Verification',
                                html: `<p> Click <a href="http://localhost:8888/auth/verify?firstName=${req.body.firstName}&email=${req.body.email}"> here </a> to verify your account! </p>`
                            }

                            transporter.sendMail(mailOptions, (err3, info) => {
                                try {
                                    if(err3) throw err3
                                } catch (err3) {
                                    console.log(err3)
                                }
                            })

                            res.send({
                                status: '201',
                                message: 'Your account has been created! Please Check your email to verify your account!'
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
    },

    verify : (req, res) => {
        let sql = `update users set isVerified = 1 where firstName = '${req.query.firstName}' and email = '${req.query.email}'`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send(`Your account has been verified. Click <a href="http://localhost:3000/login">here</a> to go to the login page. Happy shopping!`)
            } catch (err) {
                console.log(err)
            }
        })
    }
}