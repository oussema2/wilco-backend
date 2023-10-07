const airCraftService = require("../services/airCraftService");
const AirCraft = require("../db/models/airCraft");
const uploadFile = require("../helper/linode_logic").uploadFile;
exports.addAirCraft = async (req, res) => {
  const reqBody = req.body;
  console.log(req.file);

  try {
    const resUploadFile = await uploadFile(req.file);
    const aircraft = new AirCraft({
      make_and_model: reqBody.make_and_model,
      aicraft_picture: resUploadFile.location,
      aircraft_picture_key: resUploadFile.key,
      tail_number: reqBody.tail_number,
    });
    const resAirCraft = await aircraft.save();
    res.send({
      airPort: resAirCraft,
      status: 200,
      message: "ADDED",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "ERROR",
      err: error,
    });
  }
};
