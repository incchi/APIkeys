const marketModel = require("../models/marketModels")
const { updateName, updateDistance, updateItem } = require("../utils/marketUpdates")
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
            res.send("store added")
        }
    },

    updateStore : async(req,res)=>{
        let response = {name:false,distance:false,items:false}
        if(req.body.name) response.name =  updateName(req.body)
        // if(req.body.items) return response.items =await updateItem(req.body)
        // if(req.body.distance) return response.distance =await updateDistance(req.body)
        res.send({msg : response})
    }
}

module.exports = {...marketController}