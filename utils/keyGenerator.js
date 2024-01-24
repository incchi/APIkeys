const {v4:uuidv4} = require('uuid')
async function genKey() {
    return uuidv4()
    
}

module.exports = {
    genKey
}

