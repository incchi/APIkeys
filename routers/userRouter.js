const {Router}= require('express')
const { register, login, key, header } = require('../controllers/userController')

const router = Router()

router.post('/register',register)
router.get('/login',login)
router.post('/generatekey',key)
router.post('/header',header)
module.exports = router