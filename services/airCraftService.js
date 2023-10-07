const AirCraft = require('../db/models/airCraft');

async function create(airCraftData) {
 const airCraft = new AirCraft(airCraftData);
 airCraft.save();
}

async function deleteData(airCraftId) {
    airCraft.deleteOne({_id: airCraftId});
   }

module.exports = {
    create,
    deleteData,
}