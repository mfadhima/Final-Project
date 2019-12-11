const express = require('express')
const router = express.Router()
const {authController} = require('../1.controllers/index')

// router.get('/checkuser', authController.checkUser)
router.get('/login', authController.login)
router.post('/register', authController.register)
router.get('/verify', authController.verify)

module.exports = router