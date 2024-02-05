const {Router} = require('express')
const { updateStore, createStore } = require('../controllers/marketController')
const { adminRole } = require('../middlewares/userRoleMiddleware')


const router = Router()

router.post('/createstore',adminRole,createStore)
router.post('/updatestore',adminRole,updateStore)

module.exports = router