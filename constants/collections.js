const { Schema } = require("mongoose");

module.exports = [
    {
        name: "User",
        schema: new Schema({
            person: {
                firstName: String,
                middleName: String,
                lastName: String,
                tel: Number,
            },
            email: String,
            password: String,
            type: {
                type: String,
                enum: ["Client","Repairperson"]
            },
            img: {
                data: Buffer,
                contentType: String
            }
        })
    },
]