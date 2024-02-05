const marketModel = require("../models/marketModels")
const { findUser } = require("../utils/user")

const marketController = {
    createStore : async(req,res)=>{
        const {id,name,distance,items} = req.body
        const marketDB =await marketModel.findOne({storeID:id})
        if(!marketDB) {
            const newMarket = marketModel.create({
                storeID : id,
                storeName : name,
                distance : distance ?? 0,
                items : items ?? ""
            })
        }
    },

    updateStore : async(req,res)=>{
        
    }
}

module.exports = {...marketController}