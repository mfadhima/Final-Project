const express = require('express')
const router = express.Router()
const {cartController} = require('../1.controllers/index')

router.get('/checkcart', cartController.checkCart)
router.get('/getcart', cartController.getCart)
router.post('/addtocart', cartController.addCart)
router.put('/addsameproduct/:id', cartController.addSameProduct)
router.delete('/deletecart/:id', cartController.deleteCart)
router.delete('/deletefullcart/:userId', cartController.deleteFullCart)

module.exports = router