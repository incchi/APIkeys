const {Router}= require('express')
const { register, login, key, header } = require('../controllers/userController')
const { create } = require('../models/userModel')
// const verifyCookieUtils = require('../utils/verifyCookie')
const { verifyToken, createToken } = require('../controllers/jwtController')

const router = Router()

router.post('/register',register)
router.get('/login',createToken,login)
router.post('/generatekey',verifyToken,key)

module.exports = router