const {Router} = require('express')
const { updateStore } = require('../controllers/marketController')
const { adminRole } = require('../middlewares/userRoleMiddleware')


const router = Router()

router.post('/updatestore',adminRole,updateStore)

module.exports = router