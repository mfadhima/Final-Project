const db = require('../database/index')

module.exports = {
    checkCart: (req, res) => {
        let sql = `select * from carts where userId = ${req.query.userId}
                   and productId = ${req.query.productId}`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch(err) {
                console.log(err)
            }
        })
    },

    getCart: (req, res) => {
        let sql = `select * from carts where userId = ${req.query.userId}`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send(result)
            } catch(err) {
                console.log(err)
            }
        })
    },

    addCart: (req, res) => {
        let sql = `insert into carts value(0, ${req.body.productId}, '${req.body.productName}',
                   '${req.body.productDesc}', ${req.body.productPrice}, '${req.body.productImage}',
                   ${req.body.userId}, ${req.body.quantity})`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send('Added to cart.')
            } catch(err) {
                console.log(err)
            }
        })
    },

    addSameProduct: (req, res) => {
        let sql = `update carts set quantity = ${req.body.quantity} where id = ${req.params.id}`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send('Cart updated')
            } catch(err) {
                console.log(err)
            }
        })
    },

    // editCart: (req, res) => {
    //     let sql = `update `
    // },

    deleteCart: (req, res) => {
        let sql = `delete from carts where id = ${req.params.id}`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send('Cart deleted')
            } catch(err) {
                console.log(err)
            }
        })
    },

    deleteFullCart: (req, res) => {
        let sql = `delete from carts where userId = ${req.params.userId}`
        db.query(sql, (err, result) => {
            try {
                if(err) throw err
                res.send('Complete Order')
            } catch(err) {
                console.log(err)
            }
        })
    }
}