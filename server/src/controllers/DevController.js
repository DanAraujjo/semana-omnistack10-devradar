const api = require("../services/api");
const Dev = require("../models/DevSchema");
const parseStringToArray = require("../utils/parseStringToArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findOne({ username });

    if (!dev) {
      const githubResponse = await api.get(`/users/${username}`);

      const { name = login, avatar_url, bio } = githubResponse.data;

      const techsArray = parseStringToArray(techs);

      dev = await Dev.create({
        username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { latitude, longitude } = request.body;

    const dev = await Dev.findOne({ _id: request.params.id });

    if (!dev) return response.status(404).json();

    let { location } = dev;

    if (latitude && longitude) {
      location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    }

    await dev.updateOne(
      { username: dev.username, location, ...request.body },
      { new: true }
    );

    return response.json();
  },

  async destroy(request, response) {
    const dev = await Dev.findOneAndDelete({ _id: request.params.id });

    return response.json();
  }
};
