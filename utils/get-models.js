const fs = require("fs");

module.exports = (dirname) => {
    const models = {};
    const files = fs.readdirSync(dirname).filter((file) => file != "index.js");
    files.forEach(function (file) {
        modelName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].slice(1)}`;
        models[modelName] = require(`${dirname}/${file}`);
    });
    return models;
};