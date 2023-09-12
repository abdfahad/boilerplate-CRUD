const { Antons, sequelize } = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const users = await Antons.findAll();
      res.success({ users });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  post: async (req, res) => {
    try {
      const newUser = await Antons.create({
        full_name: req.body.full_name,
        email: req.body.email,
        atnNumber: req.body.atnNumber,
        dateOfBirth: req.body.dateOfBirth,
        profileImage: req.profile_image_location,
      });
      res.success({ newUser });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
  patch: async (req, res) => {
    try {
      const anton = await Antons.findOne({
        where: {
          atnNumber: req.params.atn,
        },
      });

      const updatedAnton = await anton.update(req.body, {
        returning: true,
      });

      res.success({ updatedAnton });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  delete: async (req, res) => {
    try {
      const anton = await Antons.findOne({
        where: {
          atnNumber: req.params.atn,
        },
      });

      await anton.destroy();

      res.success({ message: "Anton deleted" });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const anton = await Antons.findOne({
        where: {
          atnNumber: req.params.atn,
        },
      });

      res.success({ anton });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
