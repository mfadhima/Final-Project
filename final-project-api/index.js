const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

const {authRouter, cartRouter} = require('./2.routers/index')
const db = require('./database/index')

const port = 8888

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('productImage'))
app.use('/receipts', express.static('receipt'))

app.get(`/`, (req, res) => {
    res.send(`<h1> Final Project-ku </h1>`)
})

app.use('/auth', authRouter)
app.use('/carts', cartRouter)


// ADD PRODUCT (FOR ADMIN) ===================================================================== //
let multerStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './productImage')
    },
    filename: (req, file, cb) => {
        cb(null, `PRODUCT-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg') {
        cb(null, true)
    } else {
        req.validation = {
            error : true,
            msg : 'File must be an image'
        }
        cb(null, false)
    }
}

let upload = multer(
    {
        storage : multerStorageConfig,
        fileFilter : filterConfig
    }
)

// GET ALL PRODUCTS //
app.get('/products/productdata', (req, res) => {
    db.query(`select * from products`, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.get('/products/productbrodo', (req, res) => {
    db.query(`select * from products where name like '%Brodo%'`, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.get('/products/productguteninc', (req, res) => {
    db.query(`select * from products where name like '%GutenInc%'`, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.get('/products/productdetail/:id', (req, res) => {
    db.query(`select * from products where id = ${req.params.id}`, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

// ADD PRODUCT
app.post('/products/addproduct', upload.single('products'), (req, res) => {
    db.query(`insert into products values(0, '${req.body.name}', '${req.body.desc}', ${req.body.price}, 'files/${req.file.filename}')`, (err, result) => {
        try {
            if(err) throw err
            res.send(`Successfully add a product!`)
        } catch (err) {
            console.log(err)
        }
    })
})

// EDIT PRODUCT PHOTO
app.put('/products/editproductphoto/:id', upload.single('products'), (req, res) => {
    db.query(`update products set image = 'files/${req.file.filename}' where id = ${req.params.id}`, (err, result) => {
        try {
            if(err) throw err
            res.send(`Successfully edit a product!`)
        } catch (err) {
            console.log(err)
        }
    })
})

// EDIT PRODUCT
app.put('/products/editproduct/:id', (req, res) => {
    db.query(`update products set name = '${req.body.name}', products.desc = '${req.body.desc}', price = ${req.body.price} where id = ${req.params.id}`, (err, result) => {
        try {
            if(err) throw err
            res.send(`Successfully edit a product!`)
        } catch (err) {
            console.log(err)
        }
    })
})

// DELETE PRODUCT
app.delete('/products/deleteproduct/:id', (req, res) => {
    db.query(`delete from products where id = ${req.params.id}`, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})
// ============================================================================================= //


// TRANSACTION ================================================================================= //
let multerStorageConfig2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './receipt')
    },
    filename: (req, file, cb) => {
        cb(null, `RECEIPT-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let upload2 = multer(
    {
        storage : multerStorageConfig2,
        fileFilter : filterConfig
    }
)

// USER CLICK COMPLETES ORDER
app.post('/transactions/completetransaction', (req, res) => {
    let sql = `insert into transactions value(0, current_timestamp(), ${req.body.totalPrice},
               '', ${req.body.userId}, 0)`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send('Thank you. You can send your payment to 0000-0000-0000-0000. After that, please upload your payment receipt through your account info page.')
        } catch(err) {
            console.log(err)
        }
    })
})

// GET TRANSACTION FOR USER //
app.get('/transactions/getuserorder', (req, res) => {
    let sql = `select * from transactions where userId = ${req.query.userId}`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch(err) {
            console.log(err)
        }
    })
})

// GET TRANSACTION FOR ADMIN //
app.get('/transactions/gettransaction', (req, res) => {
    let sql = `select * from transactions`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch(err) {
            console.log(err)
        }
    })
})

// USER UPLOADS PAYMENT RECEIPT
app.put('/transactions/uploadreceipt/:id', upload2.single('receipt'), (req, res) => {
    let sql = `update transactions set receipt = 'receipts/${req.file.filename}', isVerified = 0 where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send('Receipt Uploaded')
        } catch(err) {
            console.log(err)
        }
    })
})

// VERIFY PAYMENT //
app.put('/transactions/verifypayment/:id', (req, res) => {
    let sql = `update transactions set isVerified = 1 where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send('Payment Verified')
        } catch(err) {
            console.log(err)
        }
    })
})

// REJECT PAYMENT //
app.put('/transactions/rejectpayment/:id', (req, res) => {
    let sql = `update transactions set isVerified = 2, receipt = '' where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        try {
            if(err) throw err
            res.send('Payment Rejected')
        } catch(err) {
            console.log(err)
        }
    })
})
// ============================================================================================= //


app.listen(port, console.log(`Listening to our favourite song.... (${port})`))