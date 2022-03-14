const ProblemType = require("../../../models/problem-type");

const findAll = async () => {
    return await ProblemType.find({});
}

module.exports = { findAll };