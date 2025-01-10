import {tags} from "../data/post.js"
import CustomError from "../class/customError.js";

function index(req, res) {
    let data = [...tags];
  
    const response = {
      totalCount: data.length,
      data,
    };
    res.json(response);
  }

export { index };