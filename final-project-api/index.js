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

app.put('/products/editproduct/:id', upload.single('products'), (req, res) => {
    db.query(`update products set name = '${req.body.name}', desc = '${req.body.desc}', price = ${req.body.price}, image = 'files/${req.file.filename}' where id = ${req.params.id}`, (err, result) => {
        try {
            if(err) throw err
            res.send(`Successfully edit a product!`)
        } catch (err) {
            console.log(err)
        }
    })
})

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
// ============================================================================================= //


app.listen(port, console.log(`Listening to our favourite song.... (${port})`))