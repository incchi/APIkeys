const {Router}= require('express')
const { register, login, key, header, apiAccess } = require('../controllers/userController')
const { create } = require('../models/userModel')
// const verifyCookieUtils = require('../utils/verifyCookie')
const { verifyToken, createToken } = require('../controllers/jwtController')
const { verifyKey, rateLimiter,  } = require('../middlewares/apiMiddleware')

const router = Router()

router.post('/register',register)
router.get('/login',createToken,login)
router.post('/generatekey',key)
router.post('/apilimit',verifyKey,rateLimiter,apiAccess)

module.exports = router