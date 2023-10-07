const Pilot = require('../db/models/pilot');

async function create(pilotData) {
    const pilot = new Pilot(pilotData);
    await pilot.save();
}

async function get(pilotId) {
    return  await Pilot.findOne({ _id: pilotId });
}

async function getAll() {
    return  await Pilot.find({});
}

async function deleteData(pilotId) {
    return await Pilot.deleteOne({_id: pilotId});
}

module.exports = {
    create,
    get,
    getAll,
    deleteData
}