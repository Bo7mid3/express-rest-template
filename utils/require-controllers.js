const fs = require("fs");

module.exports = (app, dirname) => {
    fs.readdir(dirname, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files = files.filter((file) => file != "index.js");
        files.forEach(function (file) {
            require(`${dirname}/${file}`)(app);
        });
    })
};