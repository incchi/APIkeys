const marketModels = require("../models/marketModels");

async function findstore(data){
    const store =await marketModels.findOne({$or:[{storeID:data.id},{storeName:data.name}]})
    if (store) return store
    else res.send(404)
}

async function updateName(data){
    console.log( data);
    const store =await findstore(data)
    console.log(store);
    store.storeName = data.name
    console.log(store);
    await store.save()
    return true 
} 
async function updateDistance(data){
    console.log(data+'dist');
    const store =await findstore(data)
    store.distance = data.distance
    await store.save()
    return true
} 
async function updateItem(data){
    console.log(data+'item');
    const store =await findstore(data)
    store.name.push(data.item)
    await store.save()
    return true 
} 


module.exports = {
    findstore,
    updateName,
    updateDistance,
    updateItem
}
