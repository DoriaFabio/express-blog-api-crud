const tags = require("../data/post.js");
const CustomError = require("../class/customError");

function index(req, res) {
    let data = [...tags];
  
    const response = {
      totalCount: data.length,
      data,
    };
    res.json(response);
  }

module.exports = { index };