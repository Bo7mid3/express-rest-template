const { model } = require("mongoose");

const COLLECTIONS = require("../constants/collections");

const getModels = () => {
    const res = {};
    COLLECTIONS.forEach((collection) => {
        const { name, schema } = collection;
        res[name] = model(name, schema);
    })
    return res;
}

module.exports = getModels();