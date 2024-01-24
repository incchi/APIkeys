const {Router}= require('express')
const { register, login, key } = require('../controllers/userController')

const router = Router()

router.post('/register',register)
router.get('/login',login)
router.post('/generatekey',key)

module.exports = router