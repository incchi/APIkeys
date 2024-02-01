const {Router} = require('express')
const { updateStore } = require('../controllers/marketController')

const router = Router()

router.post('/updatesotre',updateStore)

module.exports = router