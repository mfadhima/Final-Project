const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

const {authRouter} = require('./2.routers/index')
const db = require('./database/index')

const port = 8888

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('productImage'))

app.get(`/`, (req, res) => {
    res.send(`<h1> Final Project-ku </h1>`)
})

app.use('/auth', authRouter)


// UPLOAD PRODUCT //
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

app.post('/products/addproduct', upload.single('products'), (req, res) => {
    db.query(`insert into products values(0, '${req.body.productName}', '${req.body.productDesc}', ${req.body.productPrice}, 'files/${req.file.filename}')`, (err, result) => {
        try {
            if(err) throw err
            res.send(`Successfully add a product!`)
        } catch (err) {
            console.log(err)
        }
    })
})
// ============== //


app.listen(port, console.log(`Listening to our favourite song.... (${port})`))