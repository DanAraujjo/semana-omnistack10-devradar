const Dev = require("../models/DevSchema");
const parseStringToArray = require("../utils/parseStringToArray");

module.exports = {
  async index(request, response) {
    const { longitude, latitude, techs } = request.query;

    const techsArray = parseStringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json(devs);
  }
};
