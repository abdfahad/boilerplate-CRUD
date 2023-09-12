const fs = require("fs");
const AWS = require("aws-sdk");
const config = require("../config");
const moment = require("moment");

AWS.config.update({
  accessKeyId: config.get("aws.access_key_id"),
  secretAccessKey: config.get("aws.secret_key"),
});

module.exports = {
  uploadPicture: async (req, res, next) => {
    try {
      var { profilePicture } = req.files;

      let listName = profilePicture.name.split(".");
      let extension = listName[listName.length - 1];

      console.log(
        "filename:" +
          profilePicture.name +
          " MemeType of file: " +
          profilePicture.mimetype +
          " extension: " +
          extension
      );

      const s3 = new AWS.S3();
      fs.readFile(profilePicture.path, (err, data) => {
        if (err)
          throw { message: "Something went wrong while Uploading Picture" };
        const params = {
          Bucket: config.get("aws.bucket_name"), // pass your bucket name
          Key: "picture/" + moment().unix() + profilePicture.name,
          Body: data,
          ContentType: "image/" + extension,
          ContentEncoding: "base64",
        };
        s3.upload(params, function (s3Err, data) {
          if (s3Err) throw s3Err;
          req.pictureUrl = data.Location;
          next();
        });
      });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
  uploadDocuments: async (req, res, next) => {
    try {
      // const { workProof, insurance, drivingLicense } = req.files;
      const s3 = new AWS.S3();
      for (let doc in req.files) {
        fs.readFile(req.files[doc].path, (err, data) => {
          if (err)
            throw { message: "Something went wrong while Uploading Picture" };
          const params = {
            Bucket: config.get("aws.bucket_name"), // pass your bucket name
            Key: "document/" + moment().unix() + doc,
            Body: data,
            ContentType: req.files[doc].headers["content-type"],
            ContentEncoding: "base64",
          };
          s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err;
            req[`${req.files[doc].fieldName}`] = {
              docTitle: req.files[doc].fieldName,
              expiryDate: req.body[`${req.files[doc].fieldName}+ExpiryDate`],
              docUrl: data.Location,
            };
          });
        });
      }
      next();
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
