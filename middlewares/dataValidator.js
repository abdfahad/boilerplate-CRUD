const NAME = /^[a-zA-Z\s]{1,50}$/;
const EMAIL = /^(?=.{1,50}$)[[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ATN = /^\d+$/;
const DOB = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

module.exports = {
  dataValidator: async (req, res, next) => {
    if (req.body.full_name && !NAME.test(req.body.full_name)) {
      return res.internalError(new Error("Invalid Username"));
    }
    if (req.body.email && !EMAIL.test(req.body.email)) {
      return res.internalError(new Error("Invalid Email"));
    }
    if (req.body.atnNumber && !ATN.test(req.body.atnNumber)) {
      return res.internalError(new Error("Invalid atn"));
    }
    if (req.body.dateOfBirth && !DOB.test(req.body.dateOfBirth)) {
      return res.internalError(new Error("Invalid date of birth"));
    }
    next();
  },
};
