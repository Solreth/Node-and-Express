const req = require("express/lib/request");

function validateZip(req, res, next) {
  const zip = req.params.zip;
  parsed = parseInt(zip);
  if (zip.length !== 5 || isNaN(parsed)) {
    next(`Zip ${zip} is invalid!`);
  } else {
    next();
  }
}
module.exports = validateZip;
